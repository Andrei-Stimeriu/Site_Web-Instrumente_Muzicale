#version 330

uniform vec2 iResolution;
uniform float dt;

in vec2 gl_FragCoord;
out vec4 gl_FragColor;

#define LUM_AMBIENT 0.3

#define PASI_MAX 100
#define DIST_MAX 100.0
#define DIST_MIN 0.01

const float pi = 3.141592653589793;
const float piPe2 = 0.5*pi;

mat2 rotire(float unghi){
    float s = sin(unghi);
    float c = cos(unghi);
    return mat2(c, -s, s, c);
}

vec4 mini(vec4 a, vec4 b){
    if(a.w < b.w){
        return a;
    }
    return b;
}
float smin(float a, float b, float k){
    float apropiere = max(k-abs(a - b), 0.0);
    return min(a, b) - apropiere*apropiere/(4.0*k);
}
vec4 smini(vec4 a, vec4 b, float k){
    float apropiere = max(k-abs(a.w - b.w), 0.0);
    float ajustare = apropiere*apropiere/(4.0*k);
    float distSmin = min(a.w, b.w) - ajustare;
    float difA = abs(a.w - distSmin);
    float difB = abs(b.w - distSmin);
    vec2 ponderi = normalize(vec2(difA, difB));
    vec3 cul = ponderi.y*a.rgb + ponderi.x*b.rgb;
    return vec4(cul, distSmin);
}

vec4 maxi(vec4 a, vec4 b){
    if(a.w > b.w){
        return a;
    }
    return b;
}

vec4 dPlan(vec3 poz, vec3 culoare){
    return vec4(culoare, poz.y);
}

vec4 dSfera(vec3 poz, float r, vec3 culoare){
    return vec4(culoare, length(poz) - r);
}

vec4 dTor(vec3 poz, vec2 r, vec3 culoare){
    float x = length(vec3(poz.x, 0.0, poz.z)) - r.x;
    return vec4(culoare, length(vec2(x, poz.y)) - r.y);
}

vec4 dCuboid(vec3 poz, vec3 dim, float rotunjime, vec3 culoare){
    vec3 q = abs(poz) - dim/2;
    float dist = length(max(q, 0.0))+min(max(q.x, max(q.y, q.z)), 0.0);
    return vec4(culoare, dist-rotunjime);
}

vec4 getDist(vec3 poz){//dist de la o pozitie la cel mai apropiat obiect (din orice directie)
    //Aici avem obiectele noastre. 8v3
    float hPlan = 0.3*(sin(poz.x)+cos(poz.z));
    vec4 distPlan = dPlan(poz-vec3(0.0, hPlan, 0.0), vec3(0.8, 1.5, 0.0));

    //Nota 1
    float sine = 1.5*sin(0.5*dt);
    float doiDt = 2*dt;
    float dtPlusPi = dt + pi;
    float cPePatrDt = 1.25*dt;
    vec3 pozNota = vec3(sine*sin(dt), 0.0, sine*cos(dt));

    vec3 pozCapsula = poz-vec3(0.0+0.3*cos(-doiDt), 1.625, 6.0+0.3*sin(-doiDt))-pozNota;
    vec4 distCapsula = dCuboid(pozCapsula, vec3(0.0, 1.25, 0.0), 0.1, vec3(1.0, 0.5, 0.8));

    vec3 pozGogo = poz-vec3(0.0, 1.0, 6.0)-pozNota;
    pozGogo.xz *= rotire(doiDt);
    pozGogo.yz *= rotire(piPe2);
    vec4 distGogo = dTor(pozGogo, vec2(0.3, 0.1), vec3(1.0, 0.5, 0.8));

    vec4 distNota = smini(distCapsula, distGogo, 0.03);

    //Nota 2
    vec3 pozNota2 = vec3(sine*sin(dtPlusPi), 0.0, sine*cos(dtPlusPi));

    vec3 pozCapsula2 = poz-vec3(0.0+0.3*cos(-cPePatrDt), 1.625, 6.0+0.3*sin(-cPePatrDt))-pozNota2;
    vec4 distCapsula2 = dCuboid(pozCapsula2, vec3(0.0, 1.25, 0.0), 0.1, vec3(1.0, 0.5, 0.0));

    vec3 pozGogo2 = poz-vec3(0.0, 1.0, 6.0)-pozNota2;
    pozGogo2.xz *= rotire(cPePatrDt);
    pozGogo2.yz *= rotire(piPe2);
    vec4 distGogo2 = dTor(pozGogo2, vec2(0.3, 0.1), vec3(1.0, 0.5, 0.0));

    vec4 distNota2 = smini(distCapsula2, distGogo2, 0.03);

    vec4 distNote = smini(distNota, distNota2, 0.7);

    vec4 d = mini(distPlan, distNote);
    return d;
}

vec4 rayApril(vec3 pozOrig, vec3 dir){//dist. de la o pozitie la cel mai apropiat obiect in directia dir
    vec4 dist; dist.w = 0.0;
    vec4 temp;
    vec3 poz;
    for(int i = 0; i < PASI_MAX; i++){
        poz = pozOrig + dist.w*dir;
        temp = getDist(poz);
        dist.w += temp.w;
        dist.rgb = temp.rgb;
        if(dist.w > DIST_MAX || (dist.w < DIST_MIN && dist.w >= 0)){
            break;
        }
    }
    return dist;
}

vec3 getNormal(vec3 poz){
    float dist = getDist(poz).w;
    vec2 dx = vec2(0.01, 0.0);
    vec3 norm = dist - vec3(getDist(poz-dx.xyy).w,
                            getDist(poz-dx.yxy).w,
                            getDist(poz-dx.yyx).w);
    return normalize(norm);
}

float getLight(vec3 poz){
    //vec3 pozLum = vec3(2.0, 5.0, 4.0);
    //pozLum.xz = 3*vec2(cos(dt/1.5), sin(dt/1.5)) + vec2(0.0, 3.0);
    vec3 dirLum = normalize(vec3(2.0, 1.0, -1.0));
    vec3 norm = getNormal(poz);
    float lum = clamp(dot(dirLum, norm), 0.0, 1.0);
    float dist = rayApril(poz + 2.0*DIST_MIN*norm, dirLum).w;
    if(dist < DIST_MAX){//umbra
        return clamp(LUM_AMBIENT*lum, 0.0, 1.0);
    }
    return lum;
}

float getAmbientLight(vec3 poz){
    vec3 norm = getNormal(poz);
    return 0.5 + 0.5*dot(vec3(0.0, -1.0, 0.0), norm);
}

float getSkyLight(vec3 poz){
    vec3 norm = getNormal(poz);
    return 0.5 + 0.5*dot(vec3(0.0, 1.0, 0.0), norm);
}

void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5*iResolution.xy)/iResolution.y;
    uv.y = -uv.y;

    vec3 pozCam = vec3(0.0, 2.0, 1.0);
    vec3 dirCam = normalize(vec3(uv.x, uv.y, 1.0));
    dirCam.yz *= rotire(0.2);

    vec4 dist = rayApril(pozCam, dirCam);
    vec3 poz = pozCam + dist.w*dirCam;
    float lumSoare = getLight(poz);

    vec3 cul = vec3(0.5, 1.0, 1.0);
    if(dist.w < DIST_MAX){
        cul = dist.rgb * lumSoare*vec3(1.0, 0.9, 0.7);
        cul += getAmbientLight(poz)*vec3(0.9, 1.0, 0.6)*dist.rgb*LUM_AMBIENT*0.5;
        cul += getSkyLight(poz)*vec3(0.2, 0.7, 1.0)*0.15;
        cul += dist.rgb*LUM_AMBIENT*0.2;

        cul = pow(cul, vec3(0.6));
    }

    gl_FragColor = vec4(cul, 1.0);
}
