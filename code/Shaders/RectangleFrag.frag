#version 330 core

in vec3 myColor;
in vec2 TexCoord;

out vec4 color;

uniform sampler2D myTexture[2];
//uniform int numOfTextures;

void main()
{
	color = texture(myTexture[0], TexCoord);
	
	//color = mix(texture(myTexture[0], TexCoord).rgba, texture(myTexture[1], TexCoord).rgba, 0.3);
/*
	int currNumOfTextures = numOfTextures;
	if(numOfTextures > 1)
	{
		color = mix(texture(myTexture[0], TexCoord).rgba, texture(myTexture[1], TexCoord).rgba, 0.3);
		currNumOfTextures--;
		
		for(int i = 1; i < currNumOfTextures; i++)
		{
			color = mix(texture(myTexture[i], TexCoord).rgba, texture(myTexture[i+1], TexCoord).rgba, 0.3);
		}
	}
	else
	{
		color = texture(myTexture[0], TexCoord).rgba;
	}
	*/
} 