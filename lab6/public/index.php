<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();

$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

$action = $_REQUEST['action'] ?? null;
$view = null;
switch ($action) {
    case 'post-index':
    case null:
        $controller = new \App\Controller\PostController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'post-create':
        $controller = new \App\Controller\PostController();
        $view = $controller->createAction($_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'post-edit':
        if (!isset($_REQUEST['id'])) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'post-show':
        if (!isset($_REQUEST['id'])) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'post-delete':
        if (!isset($_REQUEST['id'])) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'car-index':
        $controller = new \App\Controller\CarController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'car-create':
        $controller = new \App\Controller\CarController();
        $view = $controller->createAction($_REQUEST['car'] ?? null, $templating, $router);
        break;
    case 'car-edit':
        if (!isset($_REQUEST['id'])) {
            break;
        }
        $controller = new \App\Controller\CarController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['car'] ?? null, $templating, $router);
        break;
    case 'car-show':
        if (!isset($_REQUEST['id'])) {
            break;
        }
        $controller = new \App\Controller\CarController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'car-delete':
        if (!isset($_REQUEST['id'])) {
            break;
        }
        $controller = new \App\Controller\CarController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'info':
        $controller = new \App\Controller\InfoController();
        $view = $controller->infoAction();
        break;
    default:
        $view = 'Not found';
        break;
}

if ($view) {
    echo $view;
}