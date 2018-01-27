#define MAX_LINE_DISTANCE 32767.0

#pragma mapbox: define highp vec4 color
#pragma mapbox: define lowp float blur
#pragma mapbox: define lowp float opacity

uniform int u_gradient;

varying vec2 v_width2;
varying vec2 v_normal;
varying float v_gamma_scale;
varying float v_linesofar;

void main() {
    #pragma mapbox: initialize highp vec4 color
    #pragma mapbox: initialize lowp float blur
    #pragma mapbox: initialize lowp float opacity

    // Calculate the distance of the pixel from the line in pixels.
    float dist = length(v_normal) * v_width2.s;

    // Calculate the antialiasing fade factor. This is either when fading in
    // the line in case of an offset line (v_width2.t) or when fading out
    // (v_width2.s)
    float blur2 = (blur + 1.0 / DEVICE_PIXEL_RATIO) * v_gamma_scale;
    float alpha = clamp(min(dist - (v_width2.t - blur2), v_width2.s - dist) / blur2, 0.0, 1.0);

    if (u_gradient == int(1)) {
        vec3 red = vec3(1.0, 0.0, 0.0);
        vec3 blue = vec3(0.0, 0.0, 1.0);

        color.xyz = red + (blue - red) * v_linesofar / MAX_LINE_DISTANCE;
    }

    gl_FragColor = color * (alpha * opacity);

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
