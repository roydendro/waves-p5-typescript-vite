import type p5 from "p5";

// Constants
export const BACKGROUND_COLOR = "#daebf5";
export const AMOUNT_OF_WAVES = 80;

/**
 * Main sketch function.
 * @param {p5} p - The p5 instance
 */
export default function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSL);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.background(BACKGROUND_COLOR);

        const increment = p.height / AMOUNT_OF_WAVES;

        let xoff = 0;
        for (let i = 0; i < AMOUNT_OF_WAVES; i++) {
            const lightness =
                Math.round(p.map(i, 0, AMOUNT_OF_WAVES, 40, 20) / 5) * 5;
            const saturation =
                Math.round(p.map(i, 0, AMOUNT_OF_WAVES, 90, 80) / 2) * 2;

            p.fill(210, saturation, lightness);

            p.beginShape();
            p.random() > 0.2 ? p.stroke("#000000") : p.stroke("#fffff");
            p.strokeWeight(3);

            // Iterate over horizontal pixels
            for (let x = -10; x <= p.width + 10; x += 10) {
                const y = p.map(
                    p.noise(xoff),
                    0,
                    1,
                    100 + increment * i,
                    300 + increment * i,
                );

                // Set the vertex
                p.vertex(x, y);
                // Increment x dimension for noise
                xoff += 0.03;
            }

            p.vertex(p.width, p.height);
            p.vertex(0, p.height);
            p.endShape(p.CLOSE);
        }
        p.noLoop();
    };
}
