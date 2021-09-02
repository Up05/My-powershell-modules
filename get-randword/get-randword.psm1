function Get-DefaultRandWord{
    Get-RandWord -wordCount 24 -avgWordLength 10
}

function Get-RandWord([Int32]$wordCount, [Int32]$avgWordLength){

    $minVal = [Math]::Floor($avgWordLength / 1.25); $minVal = $minVal * -1;
    $maxVal = [Math]::Floor($avgWordLength / 1.25); 
    $output = ""
    for($j = 0; $j -lt $wordCount; $j++){
        $wordLength = 0
        $wordLength = Get-Random -Maximum $maxVal -Minimum $minVal; 
            
        $wordLength = $wordLength + $avgWordLength;
   
        for($i = 0; $i -lt $wordLength; $i ++){
            $letterCode = Get-Random -Minimum 97 -Maximum 122
            $output += [char]$letterCode;
        }
        $output += " "
    }

    return $output

}