#include <cstring>
#include <SFML/Graphics.hpp>
using namespace sf;

void toString(char sir[], int n){
    int a = 0, nrZero = 0; bool t = true;
    int mod;
    while(n){
        a *= 10;
        mod = n%10;
        if(!mod && t){
            nrZero++;
        }
        else{
            t = false;
        }
        a += mod;
        n /= 10;
    }
    int poz = 0;
    while(a){
        sir[poz] = a%10 + '0';
        a /= 10;
        poz++;
    }
    int nrCif = poz + nrZero;
    while(poz < nrCif){
        sir[poz] = '0';
        poz++;
    }
    sir[poz] = '\0';
}

void toNumeFisier(char sir[], int n){
    strcpy(sir, "pic/");
    toString(sir+4, n);
    char extensie[] = ".png";
    strcat(sir, extensie);
}

const float pi = 3.1415926535897932384626;

int fps = 30; //60
const int nrCadreTotale = 16*fps;

int main(){
    float viteza = pi / (2*fps);
    float dt = 0.0; int nrCadru = 1;

    int w = 1920, h = 1080; //Full HD

    Shader shader;
    shader.loadFromFile("shader.frag", Shader::Fragment);
    shader.setUniform("iResolution", Vector2f(w, h));

    RectangleShape drept({w, h});

    RenderTexture texture;
    texture.create(w, h);

    char numeFis[16];
    while(true){
        texture.draw(drept, &shader);
        toNumeFisier(numeFis, nrCadru);
        texture.getTexture().copyToImage().saveToFile(numeFis);

        nrCadru++;
        if(nrCadru > nrCadreTotale){
            return 0;
        }
        dt += viteza;
        shader.setUniform("dt", dt);
    }

    return 0;
}
