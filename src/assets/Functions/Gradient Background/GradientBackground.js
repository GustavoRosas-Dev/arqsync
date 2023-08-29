import { useEffect } from "react";

const GradientBackground = ({ colors, className }) => {
  useEffect(() => {
    let step = 0;
    const gradientSpeed = 0.015;
    const container = document.querySelector(`.${className}`);

    function updateGradient() {
      if (!container) return;

      const c0_0 = colors[0];
      const c0_1 = colors[1];
      const c1_0 = colors[2];
      const c1_1 = colors[3];

      const istep = 1 - step;

      const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      const color1 = `rgb(${r1}, ${g1}, ${b1})`;

      const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      const color2 = `rgb(${r2}, ${g2}, ${b2})`;

      container.style.background = `linear-gradient(to right, ${color1}, ${color2})`;

      step += gradientSpeed;
      if (step >= 1) {
        step %= 1;
        colors[0] = colors[1];
        colors[2] = colors[3];

        colors[1] =
          colors[
            (1 + Math.floor(1 + Math.random() * (colors.length - 1))) %
              colors.length
          ];
        colors[3] =
          colors[
            (3 + Math.floor(1 + Math.random() * (colors.length - 1))) %
              colors.length
          ];
      }
    }

    const gradientInterval = setInterval(updateGradient, 10);
    return () => clearInterval(gradientInterval);
  }, [colors, className]);

  return null;
};

export default GradientBackground;
