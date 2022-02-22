const CARDS = [
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 0,
    blue: 0,
    green: 2,
    red: 1,
    black: 0,
  },
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 0,
    blue: 0,
    green: 3,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 2,
    blue: 0,
    green: 2,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#686868",
    point: 1,
    white: 0,
    blue: 4,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 1,
    blue: 2,
    green: 1,
    red: 1,
    black: 0,
  },
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 2,
    blue: 2,
    green: 0,
    red: 1,
    black: 0,
  },
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 0,
    blue: 0,
    green: 1,
    red: 3,
    black: 1,
  },
  {
    level: 1,
    color: "#686868",
    point: 0,
    white: 0,
    blue: 0,
    green: 2,
    red: 1,
    black: 0,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 1,
    blue: 0,
    green: 0,
    red: 0,
    black: 2,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 0,
    blue: 0,
    green: 0,
    red: 0,
    black: 3,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 1,
    blue: 0,
    green: 1,
    red: 1,
    black: 1,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 0,
    blue: 0,
    green: 2,
    red: 0,
    black: 2,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 1,
    white: 0,
    blue: 0,
    green: 0,
    red: 4,
    black: 0,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 1,
    blue: 0,
    green: 1,
    red: 2,
    black: 1,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 1,
    blue: 0,
    green: 2,
    red: 2,
    black: 0,
  },
  {
    level: 1,
    color: "#5264FF",
    point: 0,
    white: 0,
    blue: 1,
    green: 3,
    red: 1,
    black: 0,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 2,
    blue: 1,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 0,
    blue: 0,
    green: 3,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 1,
    blue: 1,
    green: 0,
    red: 1,
    black: 1,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 0,
    blue: 2,
    green: 0,
    red: 2,
    black: 0,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 1,
    white: 0,
    blue: 0,
    green: 0,
    red: 0,
    black: 4,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 1,
    blue: 1,
    green: 0,
    red: 1,
    black: 2,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 0,
    blue: 1,
    green: 0,
    red: 2,
    black: 2,
  },
  {
    level: 1,
    color: "#3FBA3F",
    point: 0,
    white: 1,
    blue: 3,
    green: 1,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 0,
    blue: 2,
    green: 1,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 3,
    blue: 0,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 1,
    blue: 1,
    green: 1,
    red: 0,
    black: 1,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 2,
    blue: 0,
    green: 0,
    red: 2,
    black: 0,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 1,
    white: 4,
    blue: 0,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 2,
    blue: 1,
    green: 1,
    red: 0,
    black: 1,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 2,
    blue: 0,
    green: 1,
    red: 0,
    black: 2,
  },
  {
    level: 1,
    color: "#FD3333",
    point: 0,
    white: 1,
    blue: 0,
    green: 0,
    red: 1,
    black: 3,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 0,
    blue: 3,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 0,
    blue: 0,
    green: 0,
    red: 2,
    black: 1,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 0,
    blue: 1,
    green: 1,
    red: 1,
    black: 1,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 0,
    blue: 2,
    green: 0,
    red: 0,
    black: 2,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 1,
    white: 0,
    blue: 0,
    green: 4,
    red: 0,
    black: 0,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 0,
    blue: 1,
    green: 2,
    red: 1,
    black: 1,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 0,
    blue: 2,
    green: 2,
    red: 0,
    black: 1,
  },
  {
    level: 1,
    color: "#FFFFFF",
    point: 0,
    white: 3,
    blue: 1,
    green: 0,
    red: 0,
    black: 1,
  },
  {
    level: 2,
    color: "#686868",
    point: 2,
    white: 5,
    blue: 0,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#686868",
    point: 3,
    white: 0,
    blue: 0,
    green: 0,
    red: 0,
    black: 6,
  },
  {
    level: 2,
    color: "#686868",
    point: 1,
    white: 3,
    blue: 2,
    green: 2,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#686868",
    point: 2,
    white: 0,
    blue: 1,
    green: 4,
    red: 2,
    black: 0,
  },
  {
    level: 2,
    color: "#686868",
    point: 1,
    white: 3,
    blue: 0,
    green: 3,
    red: 0,
    black: 2,
  },
  {
    level: 2,
    color: "#686868",
    point: 2,
    white: 0,
    blue: 0,
    green: 5,
    red: 3,
    black: 0,
  },
  {
    level: 2,
    color: "#5264FF",
    point: 2,
    white: 0,
    blue: 5,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#5264FF",
    point: 3,
    white: 0,
    blue: 6,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#5264FF",
    point: 1,
    white: 0,
    blue: 2,
    green: 2,
    red: 3,
    black: 0,
  },
  {
    level: 2,
    color: "#5264FF",
    point: 2,
    white: 2,
    blue: 0,
    green: 0,
    red: 1,
    black: 4,
  },
  {
    level: 2,
    color: "#5264FF",
    point: 1,
    white: 0,
    blue: 2,
    green: 3,
    red: 0,
    black: 3,
  },
  {
    level: 2,
    color: "#5264FF",
    point: 2,
    white: 5,
    blue: 3,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#3FBA3F",
    point: 2,
    white: 0,
    blue: 0,
    green: 5,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#3FBA3F",
    point: 3,
    white: 0,
    blue: 0,
    green: 6,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#3FBA3F",
    point: 1,
    white: 2,
    blue: 3,
    green: 0,
    red: 0,
    black: 2,
  },
  {
    level: 2,
    color: "#3FBA3F",
    point: 2,
    white: 4,
    blue: 2,
    green: 0,
    red: 0,
    black: 1,
  },
  {
    level: 2,
    color: "#3FBA3F",
    point: 1,
    white: 3,
    blue: 0,
    green: 2,
    red: 3,
    black: 0,
  },
  {
    level: 2,
    color: "#3FBA3F",
    point: 2,
    white: 0,
    blue: 5,
    green: 3,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#FD3333",
    point: 2,
    white: 0,
    blue: 0,
    green: 0,
    red: 0,
    black: 5,
  },
  {
    level: 2,
    color: "#FD3333",
    point: 3,
    white: 0,
    blue: 0,
    green: 0,
    red: 6,
    black: 0,
  },
  {
    level: 2,
    color: "#FD3333",
    point: 1,
    white: 2,
    blue: 0,
    green: 0,
    red: 2,
    black: 3,
  },
  {
    level: 2,
    color: "#FD3333",
    point: 2,
    white: 1,
    blue: 4,
    green: 2,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#FD3333",
    point: 1,
    white: 0,
    blue: 3,
    green: 0,
    red: 2,
    black: 3,
  },
  {
    level: 2,
    color: "#FD3333",
    point: 2,
    white: 3,
    blue: 0,
    green: 0,
    red: 0,
    black: 5,
  },
  {
    level: 2,
    color: "#FFFFFF",
    point: 2,
    white: 0,
    blue: 0,
    green: 0,
    red: 5,
    black: 0,
  },
  {
    level: 2,
    color: "#FFFFFF",
    point: 3,
    white: 6,
    blue: 0,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 2,
    color: "#FFFFFF",
    point: 1,
    white: 0,
    blue: 0,
    green: 3,
    red: 2,
    black: 2,
  },
  {
    level: 2,
    color: "#FFFFFF",
    point: 2,
    white: 0,
    blue: 0,
    green: 1,
    red: 4,
    black: 2,
  },
  {
    level: 2,
    color: "#FFFFFF",
    point: 1,
    white: 2,
    blue: 3,
    green: 0,
    red: 3,
    black: 0,
  },
  {
    level: 2,
    color: "#FFFFFF",
    point: 2,
    white: 0,
    blue: 0,
    green: 0,
    red: 5,
    black: 3,
  },
  {
    level: 3,
    color: "#686868",
    point: 4,
    white: 0,
    blue: 0,
    green: 0,
    red: 7,
    black: 0,
  },
  {
    level: 3,
    color: "#686868",
    point: 5,
    white: 0,
    blue: 0,
    green: 0,
    red: 7,
    black: 3,
  },
  {
    level: 3,
    color: "#686868",
    point: 4,
    white: 0,
    blue: 0,
    green: 3,
    red: 6,
    black: 3,
  },
  {
    level: 3,
    color: "#686868",
    point: 3,
    white: 3,
    blue: 3,
    green: 5,
    red: 3,
    black: 0,
  },
  {
    level: 3,
    color: "#5264FF",
    point: 4,
    white: 7,
    blue: 0,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 3,
    color: "#5264FF",
    point: 5,
    white: 7,
    blue: 3,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 3,
    color: "#5264FF",
    point: 4,
    white: 6,
    blue: 3,
    green: 0,
    red: 0,
    black: 3,
  },
  {
    level: 3,
    color: "#5264FF",
    point: 3,
    white: 3,
    blue: 0,
    green: 3,
    red: 3,
    black: 5,
  },
  {
    level: 3,
    color: "#3FBA3F",
    point: 4,
    white: 0,
    blue: 7,
    green: 0,
    red: 0,
    black: 0,
  },
  {
    level: 3,
    color: "#3FBA3F",
    point: 5,
    white: 0,
    blue: 7,
    green: 3,
    red: 0,
    black: 0,
  },
  {
    level: 3,
    color: "#3FBA3F",
    point: 4,
    white: 3,
    blue: 6,
    green: 3,
    red: 0,
    black: 0,
  },
  {
    level: 3,
    color: "#3FBA3F",
    point: 3,
    white: 5,
    blue: 3,
    green: 0,
    red: 3,
    black: 3,
  },
  {
    level: 3,
    color: "#FD3333",
    point: 4,
    white: 0,
    blue: 0,
    green: 7,
    red: 0,
    black: 0,
  },
  {
    level: 3,
    color: "#FD3333",
    point: 5,
    white: 0,
    blue: 0,
    green: 7,
    red: 3,
    black: 0,
  },
  {
    level: 3,
    color: "#FD3333",
    point: 4,
    white: 0,
    blue: 3,
    green: 6,
    red: 3,
    black: 0,
  },
  {
    level: 3,
    color: "#FD3333",
    point: 3,
    white: 3,
    blue: 5,
    green: 3,
    red: 0,
    black: 3,
  },
  {
    level: 3,
    color: "#FFFFFF",
    point: 4,
    white: 0,
    blue: 0,
    green: 0,
    red: 0,
    black: 7,
  },
  {
    level: 3,
    color: "#FFFFFF",
    point: 5,
    white: 3,
    blue: 0,
    green: 0,
    red: 0,
    black: 7,
  },
  {
    level: 3,
    color: "#FFFFFF",
    point: 4,
    white: 3,
    blue: 0,
    green: 0,
    red: 3,
    black: 6,
  },
  {
    level: 3,
    color: "#FFFFFF",
    point: 3,
    white: 0,
    blue: 3,
    green: 3,
    red: 5,
    black: 3,
  },
];