function pxTOvr($px, $max){
    $a = (100 * $px) / $max
    $b = [Math]::Floor($a * 100) / 100
    Write-Output "viewport resolution: $b"
    
}