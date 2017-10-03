#version 330 core

struct Material
{
	vec3 ambientColor;
	vec3 diffuseColor;
	vec3 specularColor;
	float shininess;
};

struct Light
{
	vec3 position;
	
	vec3 ambientStrength;
	vec3 diffuseStrength;
	vec3 specularStrength;
};

in vec3 Normals;
in vec3 FragPos;
out vec4 color;

uniform vec3 objectColor;
uniform vec3 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;

uniform Material material;
uniform Light light;

void main()
{
	/*Apply ambient lighting to the object by multiplying 
		its color by a constant. The object won't be completely dark, 
		it will recieve a small fraction of light from "distant sources"*/
		
	vec3 ambientLight = light.ambientStrength * material.ambientColor;

	/*We only care about the direction of vectors, 
		not their magnitude in light calculations. 
		That's why we always normalize everything*/
	vec3 norm = normalize(Normals);
	vec3 lightDir = normalize(lightPos - FragPos);
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuseLight = light.diffuseStrength * (diff * material.diffuseColor);
	
	/*Specular Lighting. The pow exponent (32) is the "shinyness" of the reflection. 
	The higher the value, the more focues the point of reflection is. 
	An exp of 256 would make a small shiny point, an exp of 2 would make a reflection as big as the cube itself*/
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	vec3 specularLight =  light.specularStrength * (spec * material.specularColor);
	
	vec3 result = (ambientLight + diffuseLight + specularLight) * objectColor;
	color = vec4(result, 1.0f);
} 