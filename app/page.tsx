"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    dietType: "",
    meatFreq: "",
    sweetsFreq: "",
    fastFoodFreq: "",
    breakfast: "",
    snack: "",
    emotionalEating: "",
    diseases: [] as string[],
    medication: "",
    activityLevel: "",
    exerciseFreq: "",
    budget: "",
    sleepQuality: "",
    sleepHours: "",
    waterIntake: "",
    drinks: [] as string[],
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // اضافه کردن نوع داده به event ها
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "diseases") {
        let newDiseases = [...formData.diseases];
        if (checked) {
          newDiseases.push(value);
        } else {
          newDiseases = newDiseases.filter((d) => d !== value);
        }
        setFormData({ ...formData, diseases: newDiseases });
      } else if (name === "drinks") {
        let newDrinks = [...formData.drinks];
        if (checked) {
          newDrinks.push(value);
        } else {
          newDrinks = newDrinks.filter((d) => d !== value);
        }
        setFormData({ ...formData, drinks: newDrinks });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  // ارسال نهایی اطلاعات به Formspree
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xanbyrpb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(3);
      } else {
        const data = await response.json();
        setError(data.error || "خطا در ارسال اطلاعات");
      }
    } catch (err) {
      setError("خطا در ارسال اطلاعات، لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">فرم اطلاعات رژیمی</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* فیلدهای فرم مثل سن، جنسیت، قد و ... */}
          {/* سن */}
          <div>
            <label>سن:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              min="1"
              max="120"
            />
          </div>

          {/* جنسیت */}
          <div>
            <label>جنسیت:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
              <option value="other">دیگر</option>
            </select>
          </div>

          {/* قد */}
          <div>
            <label>قد (سانتی‌متر):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="50"
              max="250"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* وزن */}
          <div>
            <label>وزن (کیلوگرم):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="10"
              max="300"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* هدف اصلی */}
          <div>
            <label>هدف اصلی شما:</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="weight_loss">کاهش وزن</option>
              <option value="weight_gain">افزایش وزن</option>
              <option value="weight_maintain">تثبیت وزن</option>
              <option value="sports">بهبود عملکرد ورزشی</option>
              <option value="health">بهبود سلامتی عمومی</option>
            </select>
          </div>

          {/* بقیه فیلدها رو می‌تونی اضافه کنی */}

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded w-full mt-4"
          >
            ارسال مشخصات
          </button>
        </form>
      </main>
    );
  }

  if (step === 2) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">تایید نهایی اطلاعات</h2>

        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>سن:</strong> {formData.age}</p>
          <p><strong>جنسیت:</strong> {formData.gender}</p>
          <p><strong>قد:</strong> {formData.height} سانتی‌متر</p>
          <p><strong>وزن:</strong> {formData.weight} کیلوگرم</p>
          <p><strong>هدف اصلی:</strong> {formData.goal}</p>
          {/* سایر اطلاعات اینجا */}
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setStep(1)}
            className="border border-gray-500 px-4 py-2 rounded"
          >
            بازگشت به ویرایش
          </button>

          <button
            onClick={handleFinalSubmit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "در حال ارسال..." : "تایید نهایی و ارسال"}
          </button>
        </div>
      </main>
    );
  }

  if (step === 3) {
    return (
      <main className="max-w-3xl mx-auto p-4 text-center">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          اطلاعات با موفقیت ارسال شد
        </h2>
        <p>از شما بابت ثبت اطلاعات تشکر می‌کنیم.</p>
      </main>
    );
  }
}
