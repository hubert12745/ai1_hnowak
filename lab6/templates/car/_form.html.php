<?php
/** @var $car ?\App\Model\Car */
?>

<div class="form-group">
    <label for="make">Make</label>
    <input type="text" id="make" name="car[make]" value="<?= $car ? $car->getMake() : '' ?>">
</div>

<div class="form-group">
    <label for="model">Model</label>
    <input type="text" id="model" name="car[model]" value="<?= $car ? $car->getModel() : '' ?>">
</div>

<div class="form-group">
    <label for="year">Year</label>
    <input type="number" id="year" name="car[year]" value="<?= $car ? $car->getYear() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>