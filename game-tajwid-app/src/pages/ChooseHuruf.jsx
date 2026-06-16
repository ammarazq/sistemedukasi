/**
 * src/screens/PilihHuruf.jsx
 * Grid 28 huruf hijaiyah. Tap huruf → pilih → klik Mulai.
 */
import { useState, useEffect } from "react";
import { HURUF } from "../data/huruf";
import { bacaProgres } from "../utils/progres";
import Tombol from "../pages/MenuButton";
import { mainkanLoop, mulaiIntroMusic, stopIntroMusic } from "../utils/audio";
import "../App.css";

export default function PilihHuruf({ hurufDipilih, onPilih, onMulai, onBack }) {
  const progres = bacaProgres();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    mulaiIntroMusic();

    return () => {
      stopIntroMusic();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "var(--card)",
          padding: "8px 12px 6px",
          boxShadow: "0 2px 8px rgba(44,24,16,.06)",
        }}
      >
        <div
          style={{
            width: "100%",
            marginBottom: "6px",
            display: "flex",
          }}
        >
          <Tombol
            onClick={onBack}
            style={{
              width: "100px",
              padding: "5px 10px",
              fontSize: "11px",
            }}
          >
            ← Kembali
          </Tombol>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "14px",
              animation: "bounce 2s infinite",
              margin: "4px 0",
            }}
          >
            ༺ ﷽ ༻
          </div>

          <h1
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#FFC107",
              margin: "4px 0 2px 0",
            }}
          >
            Pilih Huruf Hijaiyah
          </h1>

          <p
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              margin: "2px 0",
            }}
          >
            Tap huruf yang ingin dipelajari
          </p>
        </div>
      </div>

      {/* Grid huruf */}
      <div
        className="huruf-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "5px",
          padding: "6px",
          overflow: "hidden",
          flex: 1,
          minHeight: 0,
          gridAutoRows: "1fr",
          alignContent: "stretch",
        }}
      >
        {HURUF.map((h) => {
          const dipilih = hurufDipilih?.arab === h.arab;
          const bintang = progres[h.arab] || 0;
          return (
            <button
              key={h.arab}
              onClick={() => onPilih(h)}
              style={{
                background: dipilih ? "#FFF3D4" : "var(--card)",
                border: `1px solid ${dipilih ? "var(--aksen)" : "var(--border)"}`,
                borderRadius: "4px",
                padding: "3px 2px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1px",
                position: "relative",
                boxShadow: dipilih ? "0 0 0 2px rgba(212,134,10,.2)" : "none",
                transform: dipilih ? "scale(1.05)" : "scale(1)",
                transition: "all 0.15s",
                minHeight: "45px",
              }}
            >
              {bintang > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 1,
                    right: 2,
                    fontSize: "6px",
                    color: "var(--aksen)",
                  }}
                >
                  {"★".repeat(Math.min(bintang, 3))}
                </span>
              )}
              <span
                style={{
                  fontFamily: "var(--font-arab)",
                  fontSize: "16px",
                  lineHeight: 1,
                  color: dipilih ? "var(--aksen)" : "var(--teks)",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {h.arab}
              </span>
              <span
                style={{
                  fontSize: "6px",
                  color: dipilih ? "var(--aksen)" : "var(--muted)",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {h.latin}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer tombol */}
      <div
        style={{
          padding: "6px 8px",
          background: "var(--card)",
          boxShadow: "0 -2px 8px rgba(44,24,16,.06)",
        }}
      >
        <Tombol
          blok
          onClick={() => {
            if (!hurufDipilih) {
              setShowModal(true);
              return;
            }
            onMulai();
          }}
          style={{
            fontSize: "12px",
            padding: "8px 12px",
          }}
        >
          {hurufDipilih
            ? `Belajar ${hurufDipilih.arab} (${hurufDipilih.latin}) →`
            : "Pilih huruf dulu →"}
        </Tombol>
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeIn .25s ease",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "clamp(300px, 85vw, 420px)",
              padding: "clamp(20px, 4vw, 28px)",
              borderRadius: "clamp(16px, 4vw, 24px)",
              background: "linear-gradient(180deg,#FFFDF7 0%,#FFF4D6 100%)",
              boxShadow: "0 15px 40px rgba(0,0,0,.25)",
              textAlign: "center",
              animation: "zoomIn .25s ease",
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: "clamp(40px, 10vw, 56px)",
                marginBottom: "clamp(8px, 2vw, 10px)",
              }}
            >
              📚✨
            </div>

            {/* Title */}
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(20px, 5vw, 30px)",
                fontWeight: 800,
                color: "#0f8a70",
                marginBottom: "clamp(8px, 2vw, 12px)",
              }}
            >
              Pilih Huruf Dulu
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(13px, 2.5vw, 17px)",
                lineHeight: 1.6,
                color: "#555",
                marginBottom: "clamp(16px, 3vw, 24px)",
              }}
            >
              Silakan pilih salah satu
              <strong style={{ color: "#0f8a70" }}> huruf hijaiyah </strong>
              sebelum memulai belajar.
            </p>

            {/* Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Tombol
                onClick={() => setShowModal(false)}
                gold
                style={{
                  width: "clamp(140px, 50vw, 180px)",
                  margin: "0 auto",
                }}
              >
                Mengerti
              </Tombol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
