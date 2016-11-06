var hotDogImage;
var imagesLoaded = false;
var ctx;
var blocks = [  {x:0, y:0, xDirection:1, yDirection:8, pWidth:80, alphaValue :.1, alphaDirection: .1, red: 0, green: 255, blue: 0},
                {x:500, y:500, xDirection:-7, yDirection:-1, pWidth:80, alphaValue :.1, alphaDirection: .1, red: 255, green: 0, blue: 0},
                {x:25, y:250, xDirection:5, yDirection:-2, pWidth:80, alphaValue :.1, alphaDirection: .1, red: 0, green: 0, blue: 255}
             ];
var canvasWidth, canvasHeight;
var scaleX, scaleY, scaleDirection = 12;

function initializeGraphics()
{
    hotDogImage = document.createElement('img');
    hotDogImage.src = 'background.jpg';
    hotDogImage.addEventListener('load',
        function() 
        {
            var canvasObject =  document.getElementById('canvas');
            imagesLoaded = true;
            ctx = canvasObject.getContext("2d");
            canvasWidth = canvasObject.width;
            canvasHeight = canvasObject.height;
            scaleX = hotDogImage.width;
            scaleY = hotDogImage.height;
            drawFrame();
        }
     );
}

function drawFrame()
{
    var loopIndex, block;

    // Paint the current frame
    ctx.drawImage(hotDogImage, 
        0,0 , scaleX, scaleY,
        0, 0, canvasWidth,canvasHeight);

    // Draw some text
    ctx.font = "42px sans-serif";
    ctx.fillStyle = 'white';
    ctx.fillText("I love hot dogs and french fries.", 50, 100);

    // Paint our blocks
    for(loopIndex=0; loopIndex<blocks.length; loopIndex++ )
    {
        block = blocks[loopIndex];
        ctx.fillStyle = 'rgba(' + block.red + ',' + block.green + ',' + block.blue + ',' + block.alphaValue  + ')';
        ctx.fillRect(block.x, block.y, block.pWidth, block.pWidth);
    }
    
    // Prepare the next frame 
    
    // Do something interesting with the background
    scaleX = scaleX + scaleDirection;
    scaleY = scaleY + scaleDirection ;
    
    if (scaleX > hotDogImage.width || scaleX < canvasWidth    || scaleY > hotDogImage.height || scaleY < canvasHeight )
    {
        scaleDirection = -scaleDirection;
        scaleX = scaleX + scaleDirection;
        scaleY = scaleY + scaleDirection ;
    }

    // Move the blocks
    for(loopIndex=0; loopIndex<blocks.length; loopIndex++ )
    {
        block = blocks[loopIndex];
        if ((block.y + block.pWidth) >= canvasHeight)   block.yDirection = -block.yDirection;
        if ((block.x + block.pWidth) >= canvasWidth)    block.xDirection = -block.xDirection;
        if (block.y < 0) block.yDirection = -block.yDirection;
        if (block.x < 0) block.xDirection = -block.xDirection; 
        if (block.alphaValue < .1) block.alphaDirection = .01;
        if (block.alphaValue > 1) block.alphaDirection = -.01;

        block.x += block.xDirection;
        block.y += block.yDirection;
        block.alphaValue  = block.alphaValue  + block.alphaDirection;      
    }
    requestAnimationFrame(drawFrame);
}
