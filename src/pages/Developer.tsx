import { Mail, Github, Award, Briefcase, Code, Shield, BookOpen, Target } from 'lucide-react';

function Developer() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">Tentang Pengembang</h1>
      
      <div className="card mb-6">
        <div className="card-content flex flex-col items-center">
          <img 
            src="https://i.imghippo.com/files/fKu9828gkE.png" 
            alt="Zulfikar Sandira" 
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold">Zulfikar Sandira</h2>
          <p className="text-gray-500 mb-2">Full Stack Developer & Penetration Tester</p>
          
          <div className="flex gap-4 mt-2">
            <a href="mailto:gamingdzul5@gmail.com" className="text-[var(--primary-color)]">
              <Mail size={20} />
            </a>
            <a href="https://github.com/jaa2006" target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)]">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center mb-3">
              <BookOpen size={20} className="text-[var(--primary-color)] mr-2" />
              <h3 className="text-lg font-semibold">Pendidikan</h3>
            </div>
            <p>🎓 Lulusan: SMK Al Amah Sindulang</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center mb-3">
              <Code size={20} className="text-[var(--primary-color)] mr-2" />
              <h3 className="text-lg font-semibold">Keahlian Utama</h3>
            </div>
            <ul className="space-y-2">
              <li>• UI/UX Design (Modern Minimalist, Futuristik)</li>
              <li>• Frontend & Backend Web Development</li>
              <li>• Cybersecurity & Penetration Testing</li>
              <li>• Digital Forensics & System Exploitation</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center mb-3">
              <Award size={20} className="text-[var(--primary-color)] mr-2" />
              <h3 className="text-lg font-semibold">Sertifikasi</h3>
            </div>
            <ul className="space-y-2">
              <li>• ISC2 CISSP (Cybersecurity Certified)</li>
              <li>• Fortinet Cybersecurity Expert, Associate & Fundamental</li>
              <li>• CEH (Certified Ethical Hacker)</li>
              <li>• Simplilearn Kali Linux Basics</li>
              <li>• Hacker X Ethical Hacking</li>
              <li>• Alison Diploma in CISSP Cybersecurity</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center mb-3">
              <Briefcase size={20} className="text-[var(--primary-color)] mr-2" />
              <h3 className="text-lg font-semibold">Aplikasi & Proyek Populer</h3>
            </div>
            <ul className="space-y-2">
              <li>• Appsenz V2: Sistem Absensi Siswa berbasis GPS</li>
              <li>• Fixar IP Tracker: Aplikasi pelacak IP bergaya cyber</li>
              <li>• Swiger File Manage: Manajer file lokal & cloud terenkripsi</li>
              <li>• FIXCODE Wifi Cracker: Tool analisa jaringan nirkabel</li>
              <li>• FixSteg: Alat GUI steganografi untuk menyembunyikan data</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center mb-3">
              <Shield size={20} className="text-[var(--primary-color)] mr-2" />
              <h3 className="text-lg font-semibold">Motto</h3>
            </div>
            <p className="italic">"Teknologi bukan soal keren, tapi tentang memberi solusi nyata."</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center mb-3">
              <Target size={20} className="text-[var(--primary-color)] mr-2" />
              <h3 className="text-lg font-semibold">Visi</h3>
            </div>
            <p>Membangun aplikasi-aplikasi berkualitas yang cepat, aman, dan mudah digunakan, terutama untuk pelajar, developer muda, dan kalangan umum yang ingin produktif lewat digital.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developer;