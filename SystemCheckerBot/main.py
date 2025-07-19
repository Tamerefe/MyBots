import customtkinter as ctk
import psutil
import speedtest
import wmi
import uuid
import os
import threading
import time

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class SystemCheckerApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("🛠 System Status Checker")
        self.geometry("900x600")

        self.grid_columnconfigure(1, weight=1)
        self.grid_rowconfigure(0, weight=1)

        # Sidebar
        self.sidebar = ctk.CTkFrame(self, width=200)
        self.sidebar.grid(row=0, column=0, sticky="ns")
        self.sidebar.grid_rowconfigure(7, weight=1)

        buttons = [
            ("🔋 Battery", self.check_battery),
            ("🌐 Speed Test", self.get_speed),
            ("💻 System Info", self.get_system_info),
            ("🔍 MAC Address", self.get_mac_address),
            ("📁 List Files", self.list_files),
            ("⚙️ Processes", self.list_processes),
            ("⏱️ Download Calc", self.download_calc_window),
        ]

        for i, (text, cmd) in enumerate(buttons):
            btn = ctk.CTkButton(self.sidebar, text=text, command=cmd)
            btn.grid(row=i, column=0, padx=10, pady=5, sticky="ew")

        self.quit_btn = ctk.CTkButton(self.sidebar, text="❌ Exit", command=self.quit, fg_color="red")
        self.quit_btn.grid(row=8, column=0, padx=10, pady=20, sticky="ew")

        # Main Output
        self.output_box = ctk.CTkTextbox(self, font=("Consolas", 12), wrap="word")
        self.output_box.grid(row=0, column=1, sticky="nsew", padx=10, pady=10)

    def display(self, text):
        self.output_box.insert("end", text + "\n")
        self.output_box.see("end")

    def clear_output(self):
        self.output_box.delete("1.0", "end")

    def check_battery(self):
        self.clear_output()
        try:
            battery = psutil.sensors_battery()
            if battery:
                self.display(f"Battery: {battery.percent}%")
                self.display(f"Plugged In: {battery.power_plugged}")
                secs = battery.secsleft
                if secs == psutil.POWER_TIME_UNLIMITED:
                    self.display("Remaining: Charging")
                elif secs == psutil.POWER_TIME_UNKNOWN:
                    self.display("Remaining: Unknown")
                else:
                    h, m = divmod(secs // 60, 60)
                    self.display(f"Remaining: {h}h {m}m")
            else:
                self.display("Battery not found")
        except Exception as e:
            self.display(f"Error: {e}")

    def get_speed(self):
        self.clear_output()
        self.display("=== Internet Speed Test ===")
        self.display("")
        
        def speed_worker():
            try:
                speed = speedtest.Speedtest()
                
                # Progress bar için frame
                progress_frame = ctk.CTkFrame(self)
                progress_frame.place(relx=0.5, rely=0.5, anchor="center")
                
                # Progress bar
                progress_bar = ctk.CTkProgressBar(progress_frame)
                progress_bar.pack(pady=10)
                progress_bar.set(0)
                
                # Status label
                status_label = ctk.CTkLabel(progress_frame, text="Finding best server...", 
                                          font=("Arial", 12))
                status_label.pack()
                
                # Progress bar animasyonu
                progress_bar.set(0.3)
                self.display("Finding best server...")
                
                speed.get_best_server()
                progress_bar.set(0.6)
                status_label.configure(text="Best server found!")
                self.display("Best server found!")
                time.sleep(0.5)
                
                progress_bar.set(0.7)
                status_label.configure(text="Testing download speed...")
                self.display("Testing download speed...")
                
                download_speed = speed.download()
                progress_bar.set(0.8)
                status_label.configure(text="Download speed test completed!")
                self.display("Download speed test completed!")
                time.sleep(0.5)
                
                progress_bar.set(0.9)
                status_label.configure(text="Testing upload speed...")
                self.display("Testing upload speed...")
                
                upload_speed = speed.upload()
                progress_bar.set(1.0)
                status_label.configure(text="Upload speed test completed!")
                self.display("Upload speed test completed!")
                time.sleep(0.5)
                
                ping = speed.results.ping
                
                # Progress frame'i kaldır
                progress_frame.destroy()
                
                self.display("")
                self.display("=== Speed Test Results ===")
                self.display(f"🚀 Download Speed: {download_speed / 1_000_000:.2f} Mbps")
                self.display(f"📤 Upload Speed: {upload_speed / 1_000_000:.2f} Mbps")
                self.display(f"📡 Ping: {ping} ms")
                
            except speedtest.ConfigRetrievalError:
                self.display("Error: HTTP Error 403: Forbidden")
            except Exception as e:
                self.display(f"Error: {e}")
        
        threading.Thread(target=speed_worker, daemon=True).start()

    def get_system_info(self):
        self.clear_output()
        try:
            w = wmi.WMI()
            for osys in w.Win32_OperatingSystem():
                self.display(f"OS: {osys.Caption}")
                self.display(f"Architecture: {osys.OSArchitecture}")
                self.display(f"Version: {osys.Version}")
        except Exception as e:
            self.display(f"Error: {e}")

    def get_mac_address(self):
        self.clear_output()
        mac = uuid.UUID(int=uuid.getnode()).hex[-12:]
        formatted = ":".join([mac[i:i+2] for i in range(0, 12, 2)])
        self.display(f"MAC Address: {formatted}")

    def list_files(self):
        self.clear_output()
        try:
            path = os.path.dirname(os.path.abspath(__file__))
            count = sum(len(f) for _, _, f in os.walk(path))
            self.display(f"Files in Directory: {count}")
        except Exception as e:
            self.display(f"Error: {e}")

    def list_processes(self):
        self.clear_output()
        self.display(f"{'PID':<10}{'Name':<25}{'Status':<10}")
        self.display("-"*50)
        try:
            for proc in psutil.process_iter(['pid', 'name', 'status']):
                self.display(f"{proc.info['pid']:<10}{proc.info['name']:<25}{proc.info['status']:<10}")
        except Exception as e:
            self.display(f"Error: {e}")

    def download_calc_window(self):
        win = ctk.CTkToplevel(self)
        win.title("⏱️ Download Time Calculator")
        win.geometry("400x400")

        label1 = ctk.CTkLabel(win, text="File Size (e.g., 2GB, 500MB)")
        label1.pack(pady=5)
        entry_size = ctk.CTkEntry(win)
        entry_size.pack(pady=5)

        label2 = ctk.CTkLabel(win, text="Download Speed (e.g., 50Mbps)")
        label2.pack(pady=5)
        entry_speed = ctk.CTkEntry(win)
        entry_speed.pack(pady=5)

        result_box = ctk.CTkTextbox(win, height=120)
        result_box.pack(pady=10, padx=10, fill="both", expand=True)

        def calculate():
            try:
                size = entry_size.get().strip().upper()
                if "GB" in size:
                    bytes_ = float(size[:-2]) * 1024**3
                elif "MB" in size:
                    bytes_ = float(size[:-2]) * 1024**2
                elif "KB" in size:
                    bytes_ = float(size[:-2]) * 1024
                else:
                    bytes_ = float(size)

                speed = entry_speed.get().strip().upper()
                if "GBPS" in speed:
                    bps = float(speed[:-4]) * 1_000_000_000
                elif "MBPS" in speed:
                    bps = float(speed[:-4]) * 1_000_000
                elif "KBPS" in speed:
                    bps = float(speed[:-4]) * 1_000
                else:
                    bps = float(speed)

                total_sec = (bytes_ * 8) / bps
                h, rem = divmod(total_sec, 3600)
                m, s = divmod(rem, 60)

                result_box.delete("1.0", "end")
                result_box.insert("end", f"Estimated Time: {int(h)}h {int(m)}m {int(s)}s")
            except Exception as e:
                result_box.delete("1.0", "end")
                result_box.insert("end", f"Error: {e}")

        calc_btn = ctk.CTkButton(win, text="Calculate", command=calculate)
        calc_btn.pack(pady=10)

if __name__ == "__main__":
    app = SystemCheckerApp()
    app.mainloop()