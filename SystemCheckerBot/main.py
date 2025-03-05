import psutil
import speedtest
import wmi
import uuid
import os
import time
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import print

def check_battery():
    battery = psutil.sensors_battery()
    if battery is not None:
        print(f"Battery: {battery.percent}%")
        print(f"Plugged: {battery.power_plugged}")
        
        def convert_time(seconds):
            minutes, seconds = divmod(seconds, 60)
            hours, minutes = divmod(minutes, 60)
            return f"{hours} hours, {minutes} minutes, {seconds} seconds"
        
        if battery.secsleft == psutil.POWER_TIME_UNLIMITED:
            print("Left: Charging")
        elif battery.secsleft == psutil.POWER_TIME_UNKNOWN:
            print("Left: Unknown")
        else:
            print(f"Left: {convert_time(battery.secsleft)}")
    else:
        print("Battery not found")

def get_speed():
    try:
        speed = speedtest.Speedtest()

        with Progress(
            SpinnerColumn(),
            TextColumn("[bold cyan]{task.description}"),
            transient=True,
        ) as progress:
            task = progress.add_task("Finding best server...", total=None)
            speed.get_best_server()
            progress.update(task, description="Best server found!")
            time.sleep(0.5)  

            task = progress.add_task("Testing download speed...", total=None)
            download_speed = speed.download()
            progress.update(task, description="Download speed test completed!")
            time.sleep(0.5)

            task = progress.add_task("Testing upload speed...", total=None)
            upload_speed = speed.upload()
            progress.update(task, description="Upload speed test completed!")
            time.sleep(0.5)

        ping = speed.results.ping

        print("\n[bold green]--- Speed Test Results ---[/bold green]")
        print(f"🚀 Download Speed: {download_speed / 1_000_000:.2f} Mbps")
        print(f"📤 Upload Speed: {upload_speed / 1_000_000:.2f} Mbps")
        print(f"📡 Ping: {ping} ms")
    except speedtest.ConfigRetrievalError:
        print("[bold red]Error:[/bold red] HTTP Error 403: Forbidden")
    except Exception as e:
        print(f"[bold red]Error:[/bold red] {e}")

def get_system_info():
    c = wmi.WMI()
    for os in c.Win32_OperatingSystem():
        print(f"OS: {os.Caption}\nArchitecture: {os.OSArchitecture}\nVersion: {os.Version}")

def get_mac_address():
    mac = uuid.UUID(int=uuid.getnode()).hex[-12:]
    print(f"MAC Address: {':'.join([mac[i:i+2] for i in range(0, 12, 2)])}")

def list_files():
    path = os.path.dirname(os.path.abspath(__file__))
    file_count = sum(len(filenames) for _, _, filenames in os.walk(path))
    print(f"Total Files: {file_count}")

def list_processes():
    print(f"{'PID':<10} {'Name':<40} {'Status':<10}")
    print("="*60)
    for proc in psutil.process_iter(['pid', 'name', 'status']):
        print(f"{proc.info['pid']:<10} {proc.info['name']:<40} {proc.info['status']:<10}")

def main():
    while True:
        print("\n[bold cyan]System Status Checker Bot[/bold cyan]")
        print("1. Check Battery Status")
        print("2. Check Internet Speed")
        print("3. Get System Info")
        print("4. Get MAC Address")
        print("5. List Files in Directory")
        print("6. List Running Processes")
        print("7. Exit\n")
        
        choice = input("Enter your choice: ")
        
        if choice == "1":
            check_battery()
        elif choice == "2":
            get_speed()
        elif choice == "3":
            get_system_info()
        elif choice == "4":
            get_mac_address()
        elif choice == "5":
            list_files()
        elif choice == "6":
            list_processes()
        elif choice == "7":
            print("Exiting... Goodbye!")
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == '__main__':
    main()
