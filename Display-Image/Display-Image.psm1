function Display-Image($Path, $Name){
    if($null -eq $Path -and $null -eq $Name){
        $Names = Get-ChildItem -Filter "*.png" -Name;
        $Rand = Get-Random -Minimum 0 -Maximum $Names.Length;
        $Name = $Names[$Rand];
    }

    if($null -eq $Path){
        $Path = $PWD;
    }

    Write-Host "Path: $Path;   Name: $Name"
    Write-Host "----------------------------------------------------------------------------------------------------"

    $dir = $PWD
    Set-Location -Path "$PSScriptRoot\imgDecoder"
    $output = npx run-func index.js get_PixelArray $Path $Name 
    Set-Location $dir
    
    Write-Output $output;

    # this sh*t dumb...
}