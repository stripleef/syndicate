from PIL import Image

def process():
    img = Image.open('public/ikonka.jpg').convert('L')
    data = img.getdata()
    new_data = []
    for val in data:
        alpha = 255 - val
        new_data.append((255, 255, 255, alpha))
    out = Image.new('RGBA', img.size)
    out.putdata(new_data)
    out.save('public/ikonka.png', 'PNG')

try:
    process()
    print('Success')
except Exception as e:
    print(e)
