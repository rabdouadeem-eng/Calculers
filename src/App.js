// =============================================================
// Calculers — حاسبات مالية وصحية | Financial & Health Calculators
// عربي / English toggle
// =============================================================
import React, { useState, useMemo } from "react";

const CONFIG = {
  theme: {
    bg: "#0E1116",
    card: "#161B22",
    border: "#262C36",
    text: "#E6EDF3",
    textMuted: "#8B949E",
    accent: "#3B82F6",
    accentDark: "#1E3A8A",
    green: "#2EA043",
    red: "#DA3633",
  },
};

// -----------------------------
// ترجمات / Translations
// -----------------------------
const T = {
  ar: {
    dir: "rtl",
    title: "حاسباتي",
    subtitle: "حاسبات مالية وصحية مجانية",
    langBtn: "English",
    tabs: { loan: "🏦 القروض", bmi: "🏋️ BMI", percent: "🧮 النسب المئوية" },
    loan: {
      title: "حاسبة القروض",
      desc: "احسب القسط الشهري لأي قرض بسهولة عبر إدخال المبلغ ومدة السداد ونسبة الفائدة السنوية. تساعدك هذه الحاسبة المجانية على معرفة إجمالي المبلغ المدفوع وإجمالي الفائدة قبل التقدم لأي قرض بنكي أو تمويل شخصي أو قرض سيارة.",
      amount: "مبلغ القرض",
      duration: "مدة القرض (أشهر)",
      rate: "نسبة الفائدة السنوية %",
      calc: "احسب القرض",
      monthly: "القسط الشهري",
      total: "إجمالي المبلغ المدفوع",
      interest: "إجمالي الفائدة",
    },
    bmi: {
      title: "حاسبة BMI",
      desc: "احسب مؤشر كتلة الجسم (BMI) بإدخال وزنك وطولك لمعرفة إذا كنت ضمن الوزن الطبيعي أو تعاني من نقص أو زيادة في الوزن أو السمنة. أداة صحية مجانية ومناسبة للرجال والنساء من جميع الأعمار لمتابعة اللياقة البدنية.",
      weight: "الوزن (كجم)",
      height: "الطول (سم)",
      calc: "احسب BMI",
      result: "النتيجة",
      under: "نحافة",
      normal: "طبيعي ✓",
      over: "زيادة وزن ⚠",
      obese: "سمنة ⚠⚠",
    },
    percent: {
      title: "حاسبة النسبة المئوية",
      desc: "احسب النسبة المئوية من أي رقم، أو نسبة التغير (الزيادة أو النقصان) بين قيمتين، أو استخرج الرقم الأصلي انطلاقاً من نسبة معطاة. حاسبة بسيطة ومفيدة للطلاب والمحاسبين وحساب الخصومات اليومية.",
      mode1: "نسبة من رقم",
      mode2: "نسبة التغير",
      mode3: "الرقم الأصلي",
      percentLabel: "النسبة %",
      numberLabel: "الرقم",
      oldLabel: "القيمة القديمة",
      newLabel: "القيمة الجديدة",
      valueLabel: "القيمة الناتجة",
      calc: "احسب",
      result: "النتيجة",
    },
  },
  en: {
    dir: "ltr",
    title: "Calculers",
    subtitle: "Free financial & health calculators",
    langBtn: "العربية",
    tabs: { loan: "🏦 Loan", bmi: "🏋️ BMI", percent: "🧮 Percentage" },
    loan: {
      title: "Loan Calculator",
      desc: "Calculate the monthly payment for any loan by entering the amount, duration, and annual interest rate. This free calculator shows the total amount paid and total interest before you apply for a bank loan, personal financing, or car loan.",
      amount: "Loan Amount",
      duration: "Duration (months)",
      rate: "Annual Interest Rate %",
      calc: "Calculate Loan",
      monthly: "Monthly Payment",
      total: "Total Payment",
      interest: "Total Interest",
    },
    bmi: {
      title: "BMI Calculator",
      desc: "Calculate your Body Mass Index (BMI) by entering your weight and height to find out if you are underweight, normal weight, overweight, or obese. A free health tool suitable for men and women of all ages tracking their fitness.",
      weight: "Weight (kg)",
      height: "Height (cm)",
      calc: "Calculate BMI",
      result: "Result",
      under: "Underweight",
      normal: "Normal ✓",
      over: "Overweight ⚠",
      obese: "Obese ⚠⚠",
    },
    percent: {
      title: "Percentage Calculator",
      desc: "Calculate the percentage of any number, the percent change (increase or decrease) between two values, or find the original number from a given percentage. A simple calculator useful for students, accountants, and everyday discount math.",
      mode1: "Percent of Number",
      mode2: "Percent Change",
      mode3: "Original Number",
      percentLabel: "Percentage %",
      numberLabel: "Number",
      oldLabel: "Old Value",
      newLabel: "New Value",
      valueLabel: "Result Value",
      calc: "Calculate",
      result: "Result",
    },
  },
};

// -----------------------------
// أنماط مشتركة / Shared styles
// -----------------------------
const cardStyle = {
  background: CONFIG.theme.card,
  border: `1px solid ${CONFIG.theme.border}`,
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
};
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: `1px solid ${CONFIG.theme.border}`,
  background: "#0B0E13",
  color: CONFIG.theme.text,
  fontSize: 15,
  marginTop: 6,
  marginBottom: 14,
  boxSizing: "border-box",
};
const labelStyle = { fontSize: 13, color: CONFIG.theme.textMuted, fontWeight: 600 };
const descStyle = {
  fontSize: 13,
  color: CONFIG.theme.textMuted,
  lineHeight: 1.7,
  marginBottom: 18,
};
const btnStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: CONFIG.theme.accent,
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};
const resultBoxStyle = {
  marginTop: 16,
  padding: 16,
  borderRadius: 10,
  background: "#0B0E13",
  border: `1px solid ${CONFIG.theme.border}`,
};

function formatNum(n) {
  if (n == null || isNaN(n)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);
}

// -----------------------------
// حاسبة القروض / Loan Calculator
// -----------------------------
function LoanCalculator({ t }) {
  const [amount, setAmount] = useState(100000);
  const [duration, setDuration] = useState(60);
  const [rate, setRate] = useState(5);
  const [result, setResult] = useState(null);

  function calculate() {
    const P = parseFloat(amount);
    const n = parseInt(duration);
    const r = parseFloat(rate) / 100 / 12;
    if (!P || !n) return;
    let M;
    if (r === 0) M = P / n;
    else {
      const factor = Math.pow(1 + r, n);
      M = (P * (r * factor)) / (factor - 1);
    }
    const total = M * n;
    setResult({ monthly: M, total, interest: total - P });
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>{t.loan.title}</h2>
      <p style={descStyle}>{t.loan.desc}</p>
      <label style={labelStyle}>{t.loan.amount}</label>
      <input type="number" style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <label style={labelStyle}>{t.loan.duration}</label>
      <input type="number" style={inputStyle} value={duration} onChange={(e) => setDuration(e.target.value)} />
      <label style={labelStyle}>{t.loan.rate}</label>
      <input type="number" style={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <button style={btnStyle} onClick={calculate}>{t.loan.calc}</button>
      {result && (
        <div style={resultBoxStyle}>
          <div style={{ marginBottom: 8 }}>
            <span style={labelStyle}>{t.loan.monthly}: </span>
            <strong style={{ color: CONFIG.theme.accent }}>{formatNum(result.monthly)}</strong>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={labelStyle}>{t.loan.total}: </span>
            <strong>{formatNum(result.total)}</strong>
          </div>
          <div>
            <span style={labelStyle}>{t.loan.interest}: </span>
            <strong style={{ color: CONFIG.theme.red }}>{formatNum(result.interest)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------
// حاسبة BMI / BMI Calculator
// -----------------------------
function BMICalculator({ t }) {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return null;
    return w / (h * h);
  }, [weight, height]);

  function category() {
    if (!bmi) return "";
    if (bmi < 18.5) return t.bmi.under;
    if (bmi < 25) return t.bmi.normal;
    if (bmi < 30) return t.bmi.over;
    return t.bmi.obese;
  }
  function color() {
    if (!bmi) return CONFIG.theme.textMuted;
    if (bmi < 18.5) return "#457b9d";
    if (bmi < 25) return CONFIG.theme.green;
    if (bmi < 30) return "#ff9f1c";
    return CONFIG.theme.red;
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>{t.bmi.title}</h2>
      <p style={descStyle}>{t.bmi.desc}</p>
      <label style={labelStyle}>{t.bmi.weight}</label>
      <input type="number" style={inputStyle} value={weight} onChange={(e) => setWeight(e.target.value)} />
      <label style={labelStyle}>{t.bmi.height}</label>
      <input type="number" style={inputStyle} value={height} onChange={(e) => setHeight(e.target.value)} />
      <div style={resultBoxStyle}>
        <div style={{ fontSize: 32, fontWeight: 800, color: color() }}>
          {bmi ? bmi.toFixed(1) : "—"}
        </div>
        <div style={{ color: color(), fontWeight: 700, marginTop: 4 }}>{category()}</div>
      </div>
    </div>
  );
}

// -----------------------------
// حاسبة النسبة المئوية / Percentage Calculator
// -----------------------------
function PercentCalculator({ t }) {
  const [mode, setMode] = useState(1);
  const [percent, setPercent] = useState("");
  const [number, setNumber] = useState("");
  const [oldVal, setOldVal] = useState("");
  const [newVal, setNewVal] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (mode === 1) {
      const p = parseFloat(percent), n = parseFloat(number);
      if (isNaN(p) || isNaN(n)) return;
      setResult(formatNum((p / 100) * n));
    } else if (mode === 2) {
      const o = parseFloat(oldVal), nw = parseFloat(newVal);
      if (isNaN(o) || isNaN(nw) || o === 0) return;
      const change = ((nw - o) / o) * 100;
      setResult((change >= 0 ? "+" : "") + formatNum(change) + "%");
    } else {
      const p = parseFloat(percent), v = parseFloat(value);
      if (isNaN(p) || isNaN(v) || p === 0) return;
      setResult(formatNum((v / p) * 100));
    }
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>{t.percent.title}</h2>
      <p style={descStyle}>{t.percent.desc}</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[1, 2, 3].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(null); }}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "none",
              background: mode === m ? CONFIG.theme.accent : "#0B0E13",
              color: mode === m ? "#fff" : CONFIG.theme.textMuted,
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {m === 1 ? t.percent.mode1 : m === 2 ? t.percent.mode2 : t.percent.mode3}
          </button>
        ))}
      </div>

      {mode === 1 && (
        <>
          <label style={labelStyle}>{t.percent.percentLabel}</label>
          <input type="number" style={inputStyle} value={percent} onChange={(e) => setPercent(e.target.value)} />
          <label style={labelStyle}>{t.percent.numberLabel}</label>
          <input type="number" style={inputStyle} value={number} onChange={(e) => setNumber(e.target.value)} />
        </>
      )}
      {mode === 2 && (
        <>
          <label style={labelStyle}>{t.percent.oldLabel}</label>
          <input type="number" style={inputStyle} value={oldVal} onChange={(e) => setOldVal(e.target.value)} />
          <label style={labelStyle}>{t.percent.newLabel}</label>
          <input type="number" style={inputStyle} value={newVal} onChange={(e) => setNewVal(e.target.value)} />
        </>
      )}
      {mode === 3 && (
        <>
          <label style={labelStyle}>{t.percent.percentLabel}</label>
          <input type="number" style={inputStyle} value={percent} onChange={(e) => setPercent(e.target.value)} />
          <label style={labelStyle}>{t.percent.valueLabel}</label>
          <input type="number" style={inputStyle} value={value} onChange={(e) => setValue(e.target.value)} />
        </>
      )}

      <button style={btnStyle} onClick={calculate}>{t.percent.calc}</button>
      {result != null && (
        <div style={resultBoxStyle}>
          <span style={labelStyle}>{t.percent.result}: </span>
          <strong style={{ color: CONFIG.theme.accent, fontSize: 20 }}>{result}</strong>
        </div>
      )}
    </div>
  );
}

// -----------------------------
// التطبيق الرئيسي / Main App
// -----------------------------
export default function App() {
  const [lang, setLang] = useState("ar");
  const [tab, setTab] = useState("loan");
  const t = T[lang];

  return (
    <div dir={t.dir} style={{ background: CONFIG.theme.bg, color: CONFIG.theme.text, minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 22, margin: 0 }}>{t.title}</h1>
            <p style={{ fontSize: 12, color: CONFIG.theme.textMuted, margin: 0 }}>{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: `1px solid ${CONFIG.theme.border}`,
              background: "transparent",
              color: CONFIG.theme.text,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            🌐 {t.langBtn}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["loan", "bmi", "percent"].map((tb) => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: "none",
                background: tab === tb ? CONFIG.theme.accentDark : CONFIG.theme.card,
                color: CONFIG.theme.text,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t.tabs[tb]}
            </button>
          ))}
        </div>

        {tab === "loan" && <LoanCalculator t={t} />}
        {tab === "bmi" && <BMICalculator t={t} />}
        {tab === "percent" && <PercentCalculator t={t} />}
      </div>
    </div>
  );
    }
      
