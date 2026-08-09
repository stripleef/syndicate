from PIL import Image, ImageDraw

def process():
    img = Image.open('public/center-graphic.jpg').convert('RGBA')
    width, height = img.size
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Calculate center and radius
    cx, cy = width / 2, height / 2
    max_radius = min(width, height) / 2
    
    # Draw a radial gradient
    for y in range(height):
        for x in range(width):
            dx, dy = x - cx, y - cy
            distance = (dx*dx + dy*dy) ** 0.5
            
            # 40% inner opaque, 75% outer transparent (like CSS)
            r1 = max_radius * 0.4 * 2 # adjusted for CSS circle behavior
            r2 = max_radius * 0.75 * 2
            
            if distance < max_radius * 0.5:
                alpha = 255
            elif distance > max_radius * 0.9:
                alpha = 0
            else:
                # Smooth transition
                ratio = (distance - max_radius * 0.5) / (max_radius * 0.4)
                alpha = int(255 * (1 - ratio))
                if alpha < 0: alpha = 0
            
            mask.putpixel((x, y), alpha)
            
    img.putalpha(mask)
    img.save('public/center-graphic.png', 'PNG')

try:
    process()
    print('Success')
except Exception as e:
    print(e)
