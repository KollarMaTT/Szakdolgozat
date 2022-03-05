function roundedRectangle(
  context,
  x,
  y,
  w,
  h,
  radius,
  lineWidth,
  contourColor
) {
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.strokeStyle = contourColor;
  context.lineWidth = lineWidth;
  context.moveTo(x + radius, y);
  context.lineTo(r - radius, y);
  context.quadraticCurveTo(r, y, r, y + radius);
  context.lineTo(r, y + h - radius);
  context.quadraticCurveTo(r, b, r - radius, b);
  context.lineTo(x + radius, b);
  context.quadraticCurveTo(x, b, x, b - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.stroke();
}
