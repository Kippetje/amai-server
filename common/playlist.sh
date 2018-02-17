cd $1
mkdir -p read
for file in *.amr
do
    file=${file##*/}
    echo "Playing:" ${file}
    afplay ${file}
    cp ${file} read/${file}
    rm ${file}
done