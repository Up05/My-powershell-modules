function Convert-NbtToJSON($Text){
    $Output = "let obj = {`n    "
    $Text = $Text.Trim()
    $Text = $Text -replace "([0-9]{1,3})\w([\,\}\)\]])", '$1$2'
    $Text = $Text -replace "\:", ": "
    $Text = $Text -replace "(\w+?):", '"$1":' 
    $Text = $Text.Substring(1, $Text.length - 2)
    $Text = $Text.ToLower()

    return $Output + $Text + "`n}"
}