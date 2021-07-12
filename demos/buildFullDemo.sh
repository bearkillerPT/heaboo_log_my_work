ffmpeg -i iphone_demo.mp4 -vf pad="ceil(iw/2)*2:1080:y=300" output.mp4 -preset slow
ffmpeg -i website_demo.mp4 -i iphone1080.mp4 -filter_complex hstack fullDemo.mp4 -preset slow