cd $1
mkdir -p read
vlc --play-and-exit --intf dummy ./*.mp4
cp -a ./*.mp4 ./read/
rm *.mp4