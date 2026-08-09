from PIL import Image

def process():
    img = Image.open('public/ikonka.jpg').convert('L')
    data = img.getdata()
    new_data = []
    r, g, b = 232, 228, 221
    for val in data:
        if val > 120:
            new_data.append((255, 255, 255, 0))
        else:
            alpha = int((120 - val) / 120.0 * 255.0)
            new_data.append((r, g, b, alpha))
    out = Image.new('RGBA', img.size)
    out.putdata(new_data)
    out.save('public/ikonka.png', 'PNG')

try:
    process()
    print('Success')
except Exception as e:
    print(e)
