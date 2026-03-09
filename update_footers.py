import os
import re

directory = 'typewriter-boutique'
files = [
    'index.html', 'home-2.html', 'gallery.html', 'login.html', 
    'signup.html', 'product-view.html', 'restoration-process.html', 
    'contact.html', 'appraisal-services.html'
]

brand_regex = re.compile(r'<div class="footer-brand-name">[\s\S]*?KEY<span class="text-grad">LEGACY</span>\s*</div>')
brand_replacement = '''<div class="footer-brand-name">
          <a href="index.html" class="logo-mini">
            <img src="assets/logo.png" alt="KeyLegacy Logo" class="logo-img" style="max-height: 40px;">
          </a>
        </div>'''

pages_ul_regex = re.compile(r'<ul class="footer-ul">\s*<li><a href="index\.html">Home</a></li>\s*<li><a href="home-2\.html">Home-2</a></li>\s*<li><a href="product-view\.html">Collection</a></li>\s*<li><a href="restoration-process\.html">Restoration</a></li>\s*<li><a href="appraisal-services\.html">Appraisal</a></li>\s*</ul>')
pages_ul_replacement = '''<ul class="footer-ul">
          <li><a href="index.html">Home</a></li>
          <li><a href="home-2.html">Home-2</a></li>
          <li><a href="gallery.html">Collection</a></li>
          <li><a href="product-view.html">Showcase</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>'''

services_ul_regex = re.compile(r'<ul class="footer-ul">\s*<li><a href="#">Full Restoration</a></li>\s*<li><a href="#">Appraisal</a></li>\s*<li><a href="#">Custom Ribbon</a></li>\s*<li><a href="#">Consignment</a></li>\s*<li><a href="contact\.html">Consultations</a></li>\s*</ul>')
services_ul_replacement = '''<ul class="footer-ul">
          <li><a href="restoration-process.html">Full Restoration</a></li>
          <li><a href="appraisal-services.html">Appraisal</a></li>
          <li><a href="signup.html">Sign Up</a></li>
          <li><a href="login.html">Login</a></li>
          <li><a href="contact.html">Consultations</a></li>
        </ul>'''

for filename in files:
    filepath = os.path.join(directory, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = brand_regex.sub(brand_replacement, content)
        content = pages_ul_regex.sub(pages_ul_replacement, content)
        content = services_ul_regex.sub(services_ul_replacement, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"File not found: {filename}")
