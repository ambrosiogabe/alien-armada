/* This is a hitTest collision sheet.
There will be 5 functions that text for five different hits:

	-hitTestCircle();
	-hitTestRectangle();
	-hitTestPoint();
	-bockRectangle();
	-blockCircle();
	
	You will need the minimum for your sprite Objects properties:
	{
		sourceWidth: 64,
		sourceHeight: 64,
		sourceX: 0,
		sourceY: 0,
		width: 64,
		height: 64,
		x: 0,
		y: 0,
		
		halfWidth: function() {
			return this.width / 2;
		},
		
		halfHeight: function() {
			return this.height / 2;
		},
		
		centerX: function() {
			return this.x + (this.width / 2);
		},
		
		centerY: function() {
			return this.y + (this.height / 2);
		},
		
		left: function() {
			return this.x;
		},
		
		right: function() {
			return this.x + this.width;
		},
		
		top: function() {
			return this.y;
		},
		
		bottom: function() {
			return this.y + this.height;
		}
	};
	
	*/
	
function hitTestCircle(c1, c2)
{	
	//If camera uncomment the following and comment the other variables.
	/* 
		var vx = c1.centerX() - c2.centerX() + camera.x;
		var vy = c1.centerY() - c2.centerY() + camera.y;
	*/
	
	var vx = c1.centerX() - c2.centerX();
	var vy = c1.centerY() - c2.centerY();
	
	var magnitude = Math.sqrt(vx * vx + vy * vy);
	
	var totalRadii = c1.halfWidth() + c2.halfWidth();
	
	var hit = magnitude < totalRadii;
	
	//To see if it is working, the console should log hit when your two circles collide.
	console.log("collision");
	
	//If your two objects collide hitTestCircle(r1, r2) will return true to your function.
	return hit;
}	

function hitTestRectangle(r1, r2)
{
	//If camera uncomment the following and comment the other version of the variables
	
	/* 
		var vx = r1.centerX() - r2.centerX() + camera.x;
		var vy = r1.centerY() - r2.centerY() + camera.y;
	*/
	
	var vx = r1.centerX() - r2.centerX();
	var vy = r1.centerY() - r2.centerY();
	
	var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
	
	var hit = false;
	
	if(Math.abs(vx) <= combinedHalfWidths)
	{
		if(Math.abs(vy) <= combinedHalfHeights)
		{
			hit = true;
		}
		else
		{
			hit = false;
		}
	}
	else
	{
		hit = false;
	}
	
	//Hit will return true if a hit has occured, the same will follow for the following functions.
	return hit;
}
	
function hitTestPoint(pointX, pointY, sprite)
{
	/* If you have a camera that follows the sprite you will have to modify the points
	by adding in that extra x interval like so: */
	
	/*
	var pointX = pageX - canvas.offsetLeft + camera.x;
	var pointY = pageY - canvas.offsetTop + camera.y;
	*/
	
	/* So if you are using a camera just uncomment the section above and
	comment the section below. */
	
	var pointX = mouseX - canvas.offsetLeft;
	var pointY = mouseY - canvas.offsetTop;
	
	var hit = pointX > sprite.left() && pointX < sprite.right() && pointY > sprite.top() && pointY < sprite.bottom();
	
	return hit;
}	

function blockCircle(c1, c2)
{
	//If camera uncomment the following and comment the other variables.
	/* 
		var vx = c1.centerX() - c2.centerX() + camera.x;
		var vy = c1.centerY() - c2.centerY() + camera.y;
	*/
	
	var vx = c1.centerX() - c2.centerX();
	var vy = c1.centerY() - c2.centerY();
	
	var magnitude = Math.sqrt(vx * vx + vy * vy);
	
	var totalRadii = c1.halfWidth() + c2.halfWidth();
	
	var hit = magnitude < totalRadii;
	
	if(hit)
	{
		var overlap = totalRadii - magnitude;
		
		dx = vx / magnitude;
		dy = vy / magnitude;
		
		c1.x += overlap * dx;
		c1.y += overlap * dy;
	}
	
	//If your two objects collide hitTestCircle(r1, r2) will return true to your function.
	return hit;	
}

function blockRectangle(r1, r2)
{
	//If camera uncomment the following and comment the other version of the variables
	
	/* 
		var vx = r1.centerX() - r2.centerX() + camera.x;
		var vy = r1.centerY() - r2.centerY() + camera.y;
	*/
	
	var vx = r1.centerX() - r2.centerX();
	var vy = r1.centerY() - r2.centerY();
	
	var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
	
	var hit = false;
	
	if(Math.abs(vx) < combinedHalfWidths)
	{
		if(Math.abs(vy) < combinedHalfHeights)
		{
			overlapX = combinedHalfWidths - Math.abs(vx);
			overlapY = combinedHalfHeights - Math.abs(vy);
			
			
			if(overlapX >= overlapY)
			{
				if(vy > 0)
				{
					collisionSide = "top";
					
					r1.y += overlapY;
				}
				else
				{
					collisionSide = "bottom";
					
					r1.y -= overlapY;
				}
			}
			else
			{
				if(vx > 0)
				{
					collisionSide = "left";
					
					r1.x += overlapX;
				}
				else
				{
					collisionSide = "right";
					
					r1.x -= overlapX;
				}
			}				
		}
		else
		{
			collisionSide = "none";
		}
	}
	else
	{
		collisionSide = "none";
	}
	
	//collisionSide will return which side of your object has been hit.
	return collisionSide;	
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	