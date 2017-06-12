<?php
if ( file_get_contents('settings.txt') == 'exit' )
{
    file_put_contents('settings.txt', '00000');
}
if($_GET['get'] == 1)
{
    $intensity2 = substr(file_get_contents('settings.txt'), 0, 3);

    $color = $_GET['color'];
    $intensity = $_GET['intensity'];
    $fade = $_GET['fade'];
    
    if($intensity == 'pass')
    {
        $intensity = $intensity2;
    }
    
    if($color == 'pass')
    {
        $color = substr(file_get_contents('settings.txt'), 4, 1);
    }

    if($fade == 'pass')
    {
        $fade = substr(file_get_contents('settings.txt'), 3, 1);
    }

    $combined = $intensity.$fade.$color;
    file_put_contents('settings.txt', $combined);
}

?>
<div><?= $intensity; ?></div>
