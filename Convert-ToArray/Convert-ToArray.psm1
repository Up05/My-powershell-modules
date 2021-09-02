function Convert-ToArray($Text){
    $Output

    $regex = "[\,\- \.\|\;\#\/\>\<\:\n]" # just to be safe...
    $Text = $Text -replace $regex, '", "'

    $Array = $Text.ToCharArray();
    $Array += '"]';
    
    $Temp = $Array[0];
    $Array[0] = "[";
    $Array[0] += '"';
    $Array[0] += $Temp;
    
    $Output = $Array -join "";

    return $Output
}