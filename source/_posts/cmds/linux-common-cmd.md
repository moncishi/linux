---
abbrlink: ''
categories:
- linux常用命令
date: '2024-03-11T00:22:46+08:00'
tags:
- linux
- ubuntu
title: linux常用命令
updated: '2024-09-14T12:54:12.803+08:00'
---
# linux常用命令

## 1. tmux

1.暂时退出窗口

> ctrl + b , d

2.查看tmux历史log

> ctrl + b , [
> 此命令会进入到复制模式，可以查看tmux当前窗口的历史log，使用q键可以退出此模式

3.查看当前开了哪些tmux窗口

> tmux list-windows

4.重命名当前窗口的名字：

> Ctrl + b, ,
> 确保当前处于要重命名的窗口中。按下快捷键 Ctrl + b, , (逗号键)。这会使当前窗口的名称进入编辑状态。

5.切换到别的窗口：

> tmux switch-client -t 2:0
> 其中2为作业号，0为窗口号
> tmux attach-session -t 10
> 此处10为作业号

## 2. ip命令

## 2.1 网络接口管理

```bash
ip link show #显示所有网络接口信息
ip link show dev eth0 #显示指定网络接口信息
ip link set dev eth0 up # 启用指定网络接口
ip link set dev eth0 down # 禁用指定网络接口
ip link set dev eth0 address 00:11:22:33:44:55 #设置指定网络接口的mac地址
ip addr add 192.168.1.2/24 dev eth0 #配置ip地址
ip addr del 192.168.1.2/24 dev eth0 #删除ip地址
```

## 2.2 路由管理

```bash
ip route show #显示路由表
ip route add 192.168.2.0/24 via 192.168.1.1 dev eth0 #添加静态路由
ip route del 192.168.2.0/24 #删除路由
```

## 2.3 arp管理

```bash
ip neigh show#显示arp缓存
ip neigh add 192.168.1.1 lladdr 00:11:22:33:44:55 dev eth0 #添加静态arp
ip neigh del 192.168.1.1 dev eth0#删除arp条目
```

## 2.4 其他

```bash
sysctl -w net.ipv4.ip_forward=1 #启用ip转发
ip neigh show #显示邻居缓存
ip -s link i希纳是统计信息
```

## 3. brctl

```bash
brctl show # 显示网络桥接信息
brctl addbr mybridge # 创建一个新的网络桥接
brctl addif mybridge eth0 # 将网络接口添加到桥接
brctl delif mybridge eth0 # 从桥接中移除网络接口
brctl delbr mybridge# 删除网络桥接
```

## 4. du

```bash
du -sh #查看当前目录的使用情况
du -h --max-depth=1#逐级显示子目录的磁盘使用情况
du -h --max-depth=1 * #显示每个文件和目录的磁盘使用情况
du -h --max-depth=1 | sort -h #按大小排序显示文件和目录
```

## 5. sort排序命令

5.1 经典用法

```bash
sort filename #对文件的每一行信息按照字典顺序排序，并输出到当前目录
sort -n filename #对文件的每一行信息按照数字顺序排序，并输出到当前目录
sort -r filename #对文件的每一行信息按照字典倒序排序，并输出到当前目录
sort -u filename #对文件的每一行信息按照字典顺序并且去重排序，并输出到当前目录
sort -k<列数> filename #按列排序
sort -n -k<列数> filename #按数字字段排序
sort -t':' -k2 filename #自定义分隔符使用 -t 选项指定字段分隔符，例如 :，然后使用 -k 选项按照指定列排序
echo -e "b\na\nc" | sort #从标准输入读取数据并排序
```

## 6. i2ctools

6.1 i2cset命令

```bash
i2cset -f -y 0x1 0x48 0x03 0x0020 w
```

&emsp;&emsp;其中,-y 指定了i2c控制器为i2c1，0x48为i2c设备的地址，0x03为寄存器偏移量，他表示了寄存器地址，0x0020为要写入的数据。w表示以字（16 位）为单位读写，还可以选择其他读写单位：b，以字节（8 位）为单位读取；c， 以字符（ASCII）为单位读取。

6.2 i2cget命令

&emsp;&emsp;use example:

```bash
i2cget -y 1 0x48 0x03 w #以字为单位，读取i2c地址为0x48，寄存器0x03的数据
```

## 7.dd

&emsp;&emsp;命令基本形式：

    dd if=input_file of=output_file bs=block_size options
examples:

```bash
dd if=/dev/zero of=/dev/mmcblk0gp0 bs=512 count=1024 seek=3072
# 指定块大小为512，复制块数为1024，跳过输出文件的前3072块。（也就是从输出文件的第3072*512处开始，将输入文件的数据复制进去）

dd if=/dev/zero of=/dev/mmcblk0gp0 bs=512 count=1024 skip=3072
# 指定块大小为512，复制块数为1024，跳过输入文件的前3072块。（也就是从输入文件的第3072*512处开始，将往后的512*1024块数据复制进输出文件。（从输出文件的0x00地址开始））
```
&emsp;&emsp;dd命令还有一些其他的可选命令选项，具体为：

```bash
	• bs=1024：设置块大小为1024字节，即1KB。这是dd每次读取和写入的数据块大小。
	• count：指定要复制的块数或数据块的数量。
	• skip 在复制之前跳过输入文件的块数或字节数。用于设置输入文件的起始位置，即在输入文件中跳过一定数量的块
	• seek：在写入之前跳过输出文件的块数或字节数。用于设置输出文件的起始位置，即在输出文件中跳过一定数量的块
	• iflag：设置输入选项，例如iflag=direct表示直接访问输入文件而不进行缓存。
	• oflag：设置输出选项，例如oflag=direct表示直接写入输出文件而不进行缓存。
	• status=progress：显示复制进度信息
```
## 8.stty命令

&emsp;&emsp;stty命令可以修改终端驱动程序里的设置，可以用来显示和修改终端命令。下面是它的常见用法：

```bash
stty size;#显示终端的大小，也就是行数和列数，加上-a可以显示的更加详细。
#此外，有的时候在终端误按ctrl+s导致终端僵死，此时按下ctrl+q便可以使终端回复；

stty -F /dev/tty0 115200; #设置串口波特率为115200

stty -a -F /dev/tty2; #检查当前串口2的设置
```
## 9.使用命令行进行简单的串口通信

1. 首先使用stty设置串口波特率

> stty -F /dev/ttyAMA1 115200

2. 使用echo向串口发送信息

> echo "Hello world" > /dev/ttyAMA1

3. 使用cat打印当前串口返回的信息

> cat /dev/ttyAMA1
