<?php
/** @var \App\Model\Car $car */
/** @var \App\Service\Router $router */

$title = "Car: {$car->getMake()} {$car->getId()}";
$bodyClass = "show";

ob_start(); ?>
    <h1><?= $car->getMake() ?></h1>
    <article>
        <p>Model: <?= $car->getModel() ?></p>
        <p>Year: <?= $car->getYear() ?></p>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('car-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('car-edit', ['id' => $car->getId()]) ?>">Edit</a></li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';