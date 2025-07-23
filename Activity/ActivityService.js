export const allActivities = [
  {
    id: "1",
    time: "2 jam yang lalu",
    title: "EPAPER",
    date: "14 Juli 2025",
    content: "Serem banget yaa.. Angka kriminal tahun ini bener-bener di luar nalar.",
    tag: "Komentar",
  },
  {
    id: "2",
    time: "3 jam yang lalu",
    title: "EPAPER",
    date: "14 Juni 2025",
    content: "Keren banget, talent anak muda sekarang. Semoga terus berkembang ya....",
    tag: "Komentar",
  },
  {
    id: "3",
    time: "4 jam yang lalu",
    title: "EPAPER",
    date: "14 Juli 2025",
    content: "Titik Tekan MPLS Bahaya Judul",
    tag: "Disukai",
  },
];

export const commentsOnly = allActivities.filter((item) => item.tag === "Komentar");
export const likedOnly = allActivities.filter((item) => item.tag === "Disukai");
