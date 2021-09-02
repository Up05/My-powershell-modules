var png = require('png-js');

function get_PixelArray(Path, Name){
    let prcPixels = []
    let chars = [" ", ".", ":", ";", "I", "L", "T", "K", "N", "@"]

    let output = ""

    let path = Path + '\\' + Name

    if(!Name || Name.length < 1){
        path = Path
    }

    let image = png.load(path)
    png.decode(path, function (pixels) {

       let avg = image.width + image.height / 2
       let xI = Math.floor(avg / 80)
       let yI = Math.floor(avg / 80)
       
        if(xI < 1)
            xI = 1
        if(yI < 1)
            yI = 1
        for(let y = 0; y < image.height; y += yI){
            for(let x = 1; x < image.width; x += xI){

                let pixel = getFromPixelArray(x, y, image.width, pixels);

                if(pixel){

                    let pixel0, pixel1, pixel2, pixel3
                    if(xI > 1){

                        if(xI > 8){
                            pixel0 = getFromPixelArray(x + 4, y, image.width, pixels);
                            pixel1 = getFromPixelArray(x - 4, y, image.width, pixels);
                        } else {
                            pixel0 = getFromPixelArray(x + 1, y, image.width, pixels);
                            pixel1 = getFromPixelArray(x - 1, y, image.width, pixels);
                        }
                    }
                    if(yI > 2){
                        if(xI > 8){
                            pixel0 = getFromPixelArray(x, y + 4, image.width, pixels);
                            pixel1 = getFromPixelArray(x, y - 4, image.width, pixels);
                        } else {
                            pixel2 = getFromPixelArray(x, y + 1, image.width, pixels);
                            pixel3 = getFromPixelArray(x, y - 1, image.width, pixels);
                        }
                    }

                    if(pixel && pixel0 && pixel1 && pixel2 && pixel3)
                    pixel = {r: pixel.r + pixel0.r + pixel1.r + pixel2.r + pixel3.r / 5, 
                            g: pixel.g + pixel0.g + pixel1.g + pixel2.g + pixel3.g / 5, 
                            b: pixel.b + pixel0.b + pixel1.b + pixel2.b + pixel3.b / 5}

                
                    let avgCol = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
                    prcPixels.push(chars[Math.floor(avgCol / 25)]);
                    prcPixels.push(" ")
                }
            }
            prcPixels.push("\n");
        }
        output = prcPixels.join("");
        console.log(output);
    })
    
}

function getFromPixelArray(x, y, width, pixels){
    let i = (x + y * width) * 4
    return {
        r: pixels[i],
        g: pixels[i + 1],
        b: pixels[i + 2],
    }
}

function avgPixels(x, y, size, width, pixels){
    let overallPixels

    for(let yO = -size; yO <= size; yO ++)
        for(let xO = -size; xO <= size; xO ++){
            getFromPixelArray(x + xO, y + yO, width, pixels)



        }


}



exports.get_PixelArray = get_PixelArray;