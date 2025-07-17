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
    diseases: [],
    medication: "",
    activityLevel: "",
    exerciseFreq: "",
    budget: "",
    sleepQuality: "",
    sleepHours: "",
    waterIntake: "",
    drinks: [],
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // برای بروزرسانی داده‌ها
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "diseases") {
        let newDiseases = [...formData.diseases];
        if (checked) newDiseases.push(value);
        else newDiseases = newDiseases.filter((d) => d !== value);
        setFormData({ ...formData, diseases: newDiseases });
      } else if (name === "drinks") {
        let newDrinks = [...formData.drinks];
        if (checked) newDrinks.push(value);
        else newDrinks = newDrinks.filter((d) => d !== value);
        setFormData({ ...formData, drinks: newDrinks });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // رفتن به مرحله تایید نهایی
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // ارسال نهایی به فرم اسپری
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xanbyrpb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStep(3);
      } else {
        const data = await response.json();
        setError(data.error || "خطا در ارسال اطلاعات");
      }
    } catch {
      setError("خطا در ارسال اطلاعات، لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">فرم اطلاعات رژیمی</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label>سن:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              min="1" max="120"
              placeholder="مثلاً ۳۰"
            />
          </div>

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

          <div>
            <label>قد (سانتی‌متر):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="50" max="250"
              className="border p-2 rounded w-full"
              placeholder="مثلاً ۱۷۵"
            />
          </div>

          <div>
            <label>وزن (کیلوگرم):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="10" max="300"
              className="border p-2 rounded w-full"
              placeholder="مثلاً ۷۰"
            />
          </div>

          <div>
            <label>هدف اصلی شما از رژیم:</label>
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
              <option value="weight_maintain">حفظ وزن</option>
              <option value="sports">بهبود عملکرد ورزشی</option>
              <option value="health">بهبود سلامتی عمومی</option>
            </select>
          </div>

          <div>
            <label>نوع رژیم غذایی شما:</label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="normal">رژیم عادی</option>
              <option value="vegetarian">گیاه‌خواری</option>
              <option value="vegan">وگان</option>
              <option value="keto">کتوژنیک</option>
              <option value="other">سایر</option>
            </select>
          </div>

          <div>
            <label>میزان مصرف گوشت در هفته:</label>
            <select
              name="meatFreq"
              value={formData.meatFreq}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="never">هرگز</option>
              <option value="1-2">۱ تا ۲ بار در هفته</option>
              <option value="3-4">۳ تا ۴ بار در هفته</option>
              <option value="5+">۵ بار یا بیشتر در هفته</option>
            </select>
          </div>

          <div>
            <label>میزان مصرف شیرینیجات در هفته:</label>
            <select
              name="sweetsFreq"
              value={formData.sweetsFreq}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="never">هرگز</option>
              <option value="1-2">۱ تا ۲ بار در هفته</option>
              <option value="3-4">۳ تا ۴ بار در هفته</option>
              <option value="5+">۵ بار یا بیشتر در هفته</option>
            </select>
          </div>

          <div>
            <label>میزان مصرف فست‌فود در هفته:</label>
            <select
              name="fastFoodFreq"
              value={formData.fastFoodFreq}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="never">هرگز</option>
              <option value="1-2">۱ تا ۲ بار در هفته</option>
              <option value="3-4">۳ تا ۴ بار در هفته</option>
              <option value="5+">۵ بار یا بیشتر در هفته</option>
            </select>
          </div>

          <div>
            <label>آیا معمولاً صبحانه می‌خورید؟</label>
            <select
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </select>
          </div>

          <div>
            <label>میان‌وعده‌ها چطور؟</label>
            <select
              name="snack"
              value={formData.snack}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="yes">میان‌وعده می‌خورم</option>
              <option value="no">میان‌وعده نمی‌خورم</option>
            </select>
          </div>

          <div>
            <label>آیا در مواقع استرس یا هیجان زیاد، بیشتر غذا می‌خورید؟</label>
            <select
              name="emotionalEating"
              value={formData.emotionalEating}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </select>
          </div>

          <div>
            <label>بیماری‌های مزمن (اگر دارید، انتخاب کنید):</label>
            <div className="space-x-4">
              <label>
                <input
                  type="checkbox"
                  name="diseases"
                  value="diabetes"
                  onChange={handleChange}
                  checked={formData.diseases.includes("diabetes")}
                />
                دیابت
              </label>
              <label>
                <input
                  type="checkbox"
                  name="diseases"
                  value="hypertension"
                  onChange={handleChange}
                  checked={formData.diseases.includes("hypertension")}
                />
                فشار خون بالا
              </label>
              <label>
                <input
                  type="checkbox"
                  name="diseases"
                  value="heart_disease"
                  onChange={handleChange}
                  checked={formData.diseases.includes("heart_disease")}
                />
                بیماری قلبی
              </label>
              <label>
                <input
                  type="checkbox"
                  name="diseases"
                  value="none"
                  onChange={handleChange}
                  checked={formData.diseases.includes("none")}
                />
                ندارد
              </label>
            </div>
          </div>

          <div>
            <label>آیا دارویی مصرف می‌کنید؟ اگر بله، نام دارو را بنویسید:</label>
            <input
              type="text"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="مثلاً متفورمین"
            />
          </div>

          <div>
            <label>سطح فعالیت بدنی شما چگونه است؟</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="high">زیاد</option>
            </select>
          </div>

          <div>
            <label>تعداد دفعات ورزش در هفته:</label>
            <input
              type="number"
              name="exerciseFreq"
              value={formData.exerciseFreq}
              onChange={handleChange}
              min="0"
              max="14"
              className="border p-2 rounded w-full"
              placeholder="مثلاً ۳"
            />
          </div>

          <div>
            <label>بودجه ماهانه برای خوراکی (به تومان):</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              min="0"
              className="border p-2 rounded w-full"
              placeholder="مثلاً ۱۰۰۰۰۰۰"
            />
          </div>

          <div>
            <label>کیفیت خواب شما چگونه است؟</label>
            <select
              name="sleepQuality"
              value={formData.sleepQuality}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب کنید</option>
              <option value="poor">بد</option>
              <option value="average">متوسط</option>
              <option value="good">خوب</option>
            </select>
          </div>

          <div>
            <label>میانگین ساعت خواب در شبانه‌روز:</label>
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              min="0"
              max="24"
              className="border p-2 rounded w-full"
              placeholder="مثلاً ۷"
            />
          </div>

          <div>
            <label>میزان مصرف روزانه آب (لیتر):</label>
            <input
              type="number"
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="border p-2 rounded w-full"
              placeholder="مثلاً ۲"
            />
          </div>

          <div>
            <label>نوشیدنی‌های مورد علاقه (چند گزینه):</label>
            <div className="space-x-4">
              <label>
                <input
                  type="checkbox"
                  name="drinks"
                  value="tea"
                  onChange={handleChange}
                  checked={formData.drinks.includes("tea")}
                />
                چای
              </label>
              <label>
                <input
                  type="checkbox"
                  name="drinks"
                  value="coffee"
                  onChange={handleChange}
                  checked={formData.drinks.includes("coffee")}
                />
                قهوه
              </label>
              <label>
                <input
                  type="checkbox"
                  name="drinks"
                  value="juice"
                  onChange={handleChange}
                  checked={formData.drinks.includes("juice")}
                />
                آبمیوه
              </label>
              <label>
                <input
                  type="checkbox"
                  name="drinks"
                  value="soft_drink"
                  onChange={handleChange}
                  checked={formData.drinks.includes("soft_drink")}
                />
                نوشابه
              </label>
            </div>
          </div>

          <div>
            <label>توضیحات یا نکات اضافی:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={4}
              placeholder="در صورت تمایل توضیح دهید"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded w-full mt-6"
          >
            مرحله بعد (تایید نهایی)
          </button>
        </form>
      </main>
    );
  }

  if (step === 2) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">تایید نهایی اطلاعات وارد شده</h2>

        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>سن:</strong> {formData.age}</p>
          <p><strong>جنسیت:</strong> {formData.gender === "male" ? "مرد" : formData.gender === "female" ? "زن" : "دیگر"}</p>
          <p><strong>قد:</strong> {formData.height} سانتی‌متر</p>
          <p><strong>وزن:</strong> {formData.weight} کیلوگرم</p>
          <p><strong>هدف اصلی:</strong> {
            formData.goal === "weight_loss" ? "کاهش وزن" :
            formData.goal === "weight_gain" ? "افزایش وزن" :
            formData.goal === "weight_maintain" ? "حفظ وزن" :
            formData.goal === "sports" ? "بهبود عملکرد ورزشی" :
            formData.goal === "health" ? "بهبود سلامتی عمومی" : ""
          }</p>
          <p><strong>نوع رژیم:</strong> {
            formData.dietType === "normal" ? "رژیم عادی" :
            formData.dietType === "vegetarian" ? "گیاه‌خواری" :
            formData.dietType === "vegan" ? "وگان" :
            formData.dietType === "keto" ? "کتوژنیک" :
            formData.dietType === "other" ? "سایر" : "-"
          }</p>
          <p><strong>میزان مصرف گوشت:</strong> {
            formData.meatFreq === "never" ? "هرگز" :
            formData.meatFreq === "1-2" ? "۱ تا ۲ بار در هفته" :
            formData.meatFreq === "3-4" ? "۳ تا ۴ بار در هفته" :
            formData.meatFreq === "5+" ? "۵ بار یا بیشتر در هفته" : "-"
          }</p>
          <p><strong>میزان مصرف شیرینیجات:</strong> {
            formData.sweetsFreq === "never" ? "هرگز" :
            formData.sweetsFreq === "1-2" ? "۱ تا ۲ بار در هفته" :
            formData.sweetsFreq === "3-4" ? "۳ تا ۴ بار در هفته" :
            formData.sweetsFreq === "5+" ? "۵ بار یا بیشتر در هفته" : "-"
          }</p>
          <p><strong>میزان مصرف فست‌فود:</strong> {
            formData.fastFoodFreq === "never" ? "هرگز" :
            formData.fastFoodFreq === "1-2" ? "۱ تا ۲ بار در هفته" :
            formData.fastFoodFreq === "3-4" ? "۳ تا ۴ بار در هفته" :
            formData.fastFoodFreq === "5+" ? "۵ بار یا بیشتر در هفته" : "-"
          }</p>
          <p><strong>صبحانه می‌خورید؟</strong> {formData.breakfast === "yes" ? "بله" : formData.breakfast === "no" ? "خیر" : "-"}</p>
          <p><strong>میان‌وعده می‌خورید؟</strong> {formData.snack === "yes" ? "بله" : formData.snack === "no" ? "خیر" : "-"}</p>
          <p><strong>غذای هیجانی:</strong> {formData.emotionalEating === "yes" ? "بله" : formData.emotionalEating === "no" ? "خیر" : "-"}</p>
          <p><strong>بیماری‌ها:</strong> {formData.diseases.length > 0 ? formData.diseases.join(", ") : "ندارد"}</p>
          <p><strong>دارو مصرف می‌کنید؟</strong> {formData.medication || "ندارد"}</p>
          <p><strong>سطح فعالیت بدنی:</strong> {
            formData.activityLevel === "low" ? "کم" :
            formData.activityLevel === "medium" ? "متوسط" :
            formData.activityLevel === "high" ? "زیاد" : "-"
          }</p>
          <p><strong>تعداد ورزش در هفته:</strong> {formData.exerciseFreq}</p>
          <p><strong>بودجه ماهانه خوراکی:</strong> {formData.budget} تومان</p>
          <p><strong>کیفیت خواب:</strong> {
            formData.sleepQuality === "poor" ? "بد" :
            formData.sleepQuality === "average" ? "متوسط" :
            formData.sleepQuality === "good" ? "خوب" : "-"
          }</p>
          <p><strong>ساعات خواب:</strong> {formData.sleepHours} ساعت</p>
          <p><strong>مصرف آب:</strong> {formData.waterIntake} لیتر</p>
          <p><strong>نوشیدنی‌ها:</strong> {formData.drinks.length > 0 ? formData.drinks.join(", ") : "ندارد"}</p>
          <p><strong>توضیحات:</strong> {formData.notes || "ندارد"}</p>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="bg-gray-400 text-black p-2 rounded"
          >
            بازگشت و ویرایش
          </button>
          <button
            onClick={handleFinalSubmit}
            disabled={loading}
            className="bg-green-600 text-white p-2 rounded"
          >
            {loading ? "در حال ارسال..." : "تایید و ارسال نهایی"}
          </button>
        </div>
      </main>
    );
  }

  if (step === 3) {
    return (
      <main className="max-w-3xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">ارسال با موفقیت انجام شد!</h2>
        <p>از شما بابت تکمیل فرم سپاسگزاریم.</p>
      </main>
    );
  }

  return null;
}
