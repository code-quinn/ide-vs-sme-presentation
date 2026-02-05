import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Zap, Shield, Target, Clock, Lightbulb, Sparkles, TrendingUp, Building2, Rocket } from 'lucide-react';

// Lottie animation URLs from LottieFiles (free, public animations)
const ROCKET_LOTTIE_URL = "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571c13146/OlahFoDyDQ.json";
const CITY_LOTTIE_URL = "https://lottie.host/1ad8c8e0-6f68-4e3d-b7c4-3c3b2a2a8f89/8gY6HfCRwC.json";
const GLOBE_LOTTIE_URL = "https://lottie.host/c9eb53c7-f840-4f78-b33e-0f2b0c3e7c80/s7LhXhJMwM.json";

// Fallback inline Lottie data for rocket (compact, works offline)
const rocketLottieData = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 200,
  "h": 200,
  "nm": "Rocket",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Flame",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 160, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": {
          "a": 1,
          "k": [
            { "t": 0, "s": [100, 100, 100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
            { "t": 15, "s": [120, 140, 100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
            { "t": 30, "s": [90, 110, 100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
            { "t": 45, "s": [115, 130, 100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
            { "t": 60, "s": [95, 105, 100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
            { "t": 75, "s": [110, 125, 100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
            { "t": 90, "s": [100, 100, 100] }
          ]
        }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "el",
              "s": { "a": 0, "k": [30, 50] },
              "p": { "a": 0, "k": [0, 25] }
            },
            {
              "ty": "gf",
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "bm": 0,
              "g": {
                "p": 3,
                "k": { "a": 0, "k": [0, 1, 0.95, 0.6, 0.5, 1, 0.6, 0.2, 1, 1, 0.3, 0] }
              },
              "s": { "a": 0, "k": [0, 0] },
              "e": { "a": 0, "k": [0, 50] },
              "t": 1
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "Rocket Body",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": {
          "a": 1,
          "k": [
            { "t": 0, "s": [100, 100, 0], "i": { "x": 0.5, "y": 1 }, "o": { "x": 0.5, "y": 0 } },
            { "t": 45, "s": [100, 95, 0], "i": { "x": 0.5, "y": 1 }, "o": { "x": 0.5, "y": 0 } },
            { "t": 90, "s": [100, 100, 0] }
          ]
        },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [40, 80] },
              "p": { "a": 0, "k": [0, 20] },
              "r": { "a": 0, "k": 8 }
            },
            {
              "ty": "gf",
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "bm": 0,
              "g": {
                "p": 3,
                "k": { "a": 0, "k": [0, 0.55, 0.36, 0.96, 0.5, 0.42, 0.27, 0.85, 1, 0.3, 0.18, 0.75] }
              },
              "s": { "a": 0, "k": [-20, 0] },
              "e": { "a": 0, "k": [20, 0] },
              "t": 1
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "sr",
              "sy": 1,
              "d": 1,
              "pt": { "a": 0, "k": 3 },
              "p": { "a": 0, "k": [0, -30] },
              "r": { "a": 0, "k": 0 },
              "ir": { "a": 0, "k": 0 },
              "is": { "a": 0, "k": 0 },
              "or": { "a": 0, "k": 25 },
              "os": { "a": 0, "k": 0 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.9, 0.9, 0.95, 1] },
              "o": { "a": 0, "k": 100 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 180 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "el",
              "s": { "a": 0, "k": [16, 16] },
              "p": { "a": 0, "k": [0, 5] }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.4, 0.85, 0.95, 1] },
              "o": { "a": 0, "k": 100 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 3,
      "ty": 4,
      "nm": "Left Fin",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [75, 145, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "sr",
              "sy": 1,
              "d": 1,
              "pt": { "a": 0, "k": 3 },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 0 },
              "ir": { "a": 0, "k": 0 },
              "is": { "a": 0, "k": 0 },
              "or": { "a": 0, "k": 15 },
              "os": { "a": 0, "k": 0 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.35, 0.25, 0.65, 1] },
              "o": { "a": 0, "k": 100 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 90 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 4,
      "ty": 4,
      "nm": "Right Fin",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [125, 145, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "sr",
              "sy": 1,
              "d": 1,
              "pt": { "a": 0, "k": 3 },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 0 },
              "ir": { "a": 0, "k": 0 },
              "is": { "a": 0, "k": 0 },
              "or": { "a": 0, "k": 15 },
              "os": { "a": 0, "k": 0 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.35, 0.25, 0.65, 1] },
              "o": { "a": 0, "k": 100 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": -90 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    }
  ]
};

// Building/city Lottie data
const buildingLottieData = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 120,
  "w": 200,
  "h": 200,
  "nm": "City",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Building 1",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [60, 130, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [35, 100] },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 2 }
            },
            {
              "ty": "gf",
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "bm": 0,
              "g": {
                "p": 2,
                "k": { "a": 0, "k": [0, 0.15, 0.25, 0.45, 1, 0.1, 0.2, 0.35] }
              },
              "s": { "a": 0, "k": [-17, 0] },
              "e": { "a": 0, "k": [17, 0] },
              "t": 1
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "Building 2 (Main)",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 115, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [45, 130] },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 2 }
            },
            {
              "ty": "gf",
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "bm": 0,
              "g": {
                "p": 3,
                "k": { "a": 0, "k": [0, 0.12, 0.35, 0.55, 0.5, 0.15, 0.4, 0.6, 1, 0.1, 0.3, 0.5] }
              },
              "s": { "a": 0, "k": [-22, 0] },
              "e": { "a": 0, "k": [22, 0] },
              "t": 1
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 3,
      "ty": 4,
      "nm": "Building 3",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [145, 140, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [30, 80] },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 2 }
            },
            {
              "ty": "gf",
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "bm": 0,
              "g": {
                "p": 2,
                "k": { "a": 0, "k": [0, 0.18, 0.28, 0.42, 1, 0.12, 0.22, 0.35] }
              },
              "s": { "a": 0, "k": [-15, 0] },
              "e": { "a": 0, "k": [15, 0] },
              "t": 1
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 4,
      "ty": 4,
      "nm": "Windows",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [-12, -40] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": {
                "a": 1,
                "k": [
                  { "t": 0, "s": [80], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 60, "s": [40], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 120, "s": [80] }
                ]
              }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [0, -40] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": { "a": 0, "k": 90 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [12, -40] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": {
                "a": 1,
                "k": [
                  { "t": 0, "s": [60], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 40, "s": [95], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 80, "s": [50], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 120, "s": [60] }
                ]
              }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [-12, -25] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": { "a": 0, "k": 75 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [0, -25] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": {
                "a": 1,
                "k": [
                  { "t": 0, "s": [50], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 50, "s": [90], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 100, "s": [45], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 120, "s": [50] }
                ]
              }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [12, -25] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": { "a": 0, "k": 85 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [-12, -10] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": {
                "a": 1,
                "k": [
                  { "t": 0, "s": [95], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 70, "s": [55], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 120, "s": [95] }
                ]
              }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [0, -10] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": { "a": 0, "k": 70 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [6, 8] },
              "p": { "a": 0, "k": [12, -10] },
              "r": { "a": 0, "k": 1 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.95, 0.7, 1] },
              "o": { "a": 0, "k": 80 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    },
    {
      "ddd": 0,
      "ind": 5,
      "ty": 4,
      "nm": "Antenna Light",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [100, 42, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [3, 10] },
              "p": { "a": 0, "k": [0, 5] },
              "r": { "a": 0, "k": 0 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.4, 0.45, 0.5, 1] },
              "o": { "a": 0, "k": 100 }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "el",
              "s": { "a": 0, "k": [8, 8] },
              "p": { "a": 0, "k": [0, 0] }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.3, 0.3, 1] },
              "o": {
                "a": 1,
                "k": [
                  { "t": 0, "s": [100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 30, "s": [30], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 60, "s": [100], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 90, "s": [30], "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] } },
                  { "t": 120, "s": [100] }
                ]
              }
            },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ]
    }
  ]
};

const VisualMetaphorSlide = ({ slide }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black gradient-text text-center mb-8"
      >
        {slide?.title || 'The Big Picture'}
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* IDE - Rocket Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[420px] flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0c0a1d 0%, #1a103d 30%, #2d1b69 70%, #4c1d95 100%)',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.2), inset 0 0 80px rgba(139, 92, 246, 0.1)',
            }}
          >
            {/* Starfield background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.5,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            {/* Nebula glow effects */}
            <div 
              className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <div 
              className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                filter: 'blur(25px)',
              }}
            />

            {/* Label */}
            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/50 backdrop-blur-sm">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-purple-300 text-lg">IDE</span>
              </div>
            </div>

            {/* Lottie Animation - Rocket */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ width: 220, height: 220 }}
              >
                <Lottie 
                  animationData={rocketLottieData}
                  loop={true}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))'
                  }}
                />
              </motion.div>
            </div>

            {/* Launch platform */}
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <div 
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(to top, #1e1b4b 0%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-slate-700 rounded" />
            </div>

            {/* Status text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <motion.span 
                className="text-sm font-mono text-purple-300/80 bg-purple-900/30 px-4 py-1.5 rounded-full"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 Launch → Learn → Iterate → Repeat
              </motion.span>
            </div>
          </div>

          {/* IDE Traits */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Zap, text: "Ship fast", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
              { icon: Target, text: "Learn from failures", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
              { icon: TrendingUp, text: "Iterate rapidly", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl ${item.bg} border ${item.border}`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SME - City Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[420px] flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 80%, #475569 100%)',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.15), inset 0 0 80px rgba(59, 130, 246, 0.05)',
            }}
          >
            {/* Stars - subtle */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    opacity: 0.3 + Math.random() * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Moon */}
            <motion.div
              className="absolute top-8 right-10"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div 
                className="w-14 h-14 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fef9c3 0%, #fde68a 50%, #fcd34d 100%)',
                  boxShadow: '0 0 40px rgba(254, 249, 195, 0.4)',
                }}
              />
            </motion.div>

            {/* Label */}
            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/50 backdrop-blur-sm">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-blue-300 text-lg">SME</span>
              </div>
            </div>

            {/* Lottie Animation - City */}
            <div className="flex-1 flex items-center justify-center relative z-10 pt-8">
              <div style={{ width: 280, height: 280 }}>
                <Lottie 
                  animationData={buildingLottieData}
                  loop={true}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
                  }}
                />
              </div>
            </div>

            {/* Ground / City base */}
            <div className="absolute bottom-0 left-0 right-0 h-12">
              <div 
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(to top, #065f46 0%, #047857 50%, transparent 100%)',
                }}
              />
            </div>

            {/* Status text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-sm font-mono text-blue-300/80 bg-blue-900/30 px-4 py-1.5 rounded-full">
                🏢 99.9% Uptime • Steady Growth • Predictable
              </span>
            </div>
          </div>

          {/* SME Traits */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Shield, text: "Minimize risk", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
              { icon: Building2, text: "Solid foundation", color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30" },
              { icon: Clock, text: "Steady growth", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl ${item.bg} border ${item.border}`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <div 
          className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
          }}
        >
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <p className="text-white/80 text-base">
            <span className="text-purple-400 font-bold">IDE: </span>
            Every crash = data → learning → iteration
            <span className="mx-4 text-white/30">|</span>
            <span className="text-blue-400 font-bold">SME: </span>
            Stability over speed, every time
          </p>
          <Sparkles className="w-6 h-6 text-pink-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
