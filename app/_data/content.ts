/**
 * Single source of truth for all landing-page copy (Vietnamese).
 *
 * Content is PLACEHOLDER — grounded in WTP Advisory's real positioning
 * (Cố vấn Quản trị thuê ngoài / Khai phóng lãnh đạo) but stats, contact
 * details and brochure links must be replaced with verified data.
 * Edit this file to drop in real content; components read from here.
 */

export const company = {
  name: "WTP Advisory",
  legalName: "Công ty TNHH WTP Advisory",
  taxCode: "0317943250",
  tagline: "Khai phóng lãnh đạo",
} as const;

export const nav = {
  links: [
    { label: "Dịch vụ", href: "#dich-vu" },
    { label: "Vì sao chọn WTP", href: "#vi-sao" },
    { label: "Quy trình", href: "#quy-trinh" },
    { label: "Hệ sinh thái", href: "#he-sinh-thai" },
    { label: "Liên hệ", href: "#lien-he" },
  ],
  phone: "+84 28 0000 0000", // TODO: số điện thoại thật
  cta: { label: "Đặt lịch tư vấn", href: "#lien-he" },
} as const;

export const hero = {
  eyebrow: "Cố vấn Quản trị thuê ngoài",
  motto: "Think Global – Go Global",
  title: "Khai phóng lãnh đạo,\nbứt phá tăng trưởng",
  quote:
    "“WTP — Đồng hành cùng Doanh nghiệp Việt Nam tham gia chuỗi cung ứng toàn cầu.”",
  description:
    "WTP Advisory đồng hành cùng doanh nghiệp Việt từ chiến lược đến thực thi — giúp ban lãnh đạo tập trung vào điều quan trọng nhất, trong khi đội ngũ chuyên gia của chúng tôi vận hành bộ máy quản trị chuyên nghiệp.",
  primaryCta: { label: "Đặt lịch tư vấn miễn phí", href: "#lien-he" },
  secondaryCta: { label: "Khám phá dịch vụ", href: "#dich-vu" },
  trustLabel: "Thành viên hệ sinh thái WTP",
  trustLogos: ["WTP Capital", "ATP Accounting", "H2O Brand", "GCW", "Dragon Navi"],
} as const;

export type Service = {
  icon: string; // lucide icon name
  title: string;
  description: string;
};

export const services = {
  eyebrow: "Dịch vụ",
  title: "Giải pháp quản trị toàn diện cho doanh nghiệp",
  subtitle:
    "Từ định hướng chiến lược đến vận hành hằng ngày — WTP Advisory cung cấp năng lực quản trị cấp cao theo mô hình thuê ngoài, linh hoạt theo nhu cầu của bạn.",
  items: [
    {
      icon: "Compass",
      title: "Cố vấn Quản trị thuê ngoài",
      description:
        "Đảm nhận vai trò cố vấn quản trị hoặc thành viên hội đồng độc lập, đồng hành cùng ban lãnh đạo trong các quyết định trọng yếu.",
    },
    {
      icon: "Target",
      title: "Chiến lược & Quản trị",
      description:
        "Xây dựng chiến lược tăng trưởng, mô hình kinh doanh và hệ thống quản trị hiện đại, sẵn sàng mở rộng quy mô.",
    },
    {
      icon: "Calculator",
      title: "Tài chính – Kế toán",
      description:
        "Tư vấn tài chính, kế toán và quản trị dòng tiền chuyên nghiệp, minh bạch cùng đối tác ATP Accounting.",
    },
    {
      icon: "ReceiptText",
      title: "Thuế & Tuân thủ",
      description:
        "Hoạch định thuế, tuân thủ và tối ưu nghĩa vụ tài chính, giảm thiểu rủi ro pháp lý cho doanh nghiệp.",
    },
    {
      icon: "Megaphone",
      title: "Marketing & Thương hiệu",
      description:
        "Tư vấn và triển khai chiến lược thương hiệu, marketing và bán hàng cùng đội ngũ H2O Brand.",
    },
    {
      icon: "Users",
      title: "Nhân sự & Tổ chức",
      description:
        "Thiết kế cơ cấu tổ chức, hệ thống nhân sự và năng lực đội ngũ để doanh nghiệp phát triển bền vững.",
    },
  ] satisfies Service[],
} as const;

export const whyChoose = {
  eyebrow: "Vì sao chọn WTP",
  title: "Đối tác quản trị đáng tin cậy của doanh nghiệp Việt",
  description:
    "Với triết lý “Think Global – Go Global”, WTP Advisory mang đến năng lực quản trị tầm cỡ quốc tế cùng sự thấu hiểu sâu sắc thị trường Việt Nam — giúp doanh nghiệp tăng trưởng đột phá và vươn ra chuỗi cung ứng toàn cầu.",
  stats: [
    { value: "20+", label: "Năm kinh nghiệm quản trị" },
    { value: "100+", label: "Doanh nghiệp đồng hành" },
    { value: "50+", label: "Chuyên gia & cố vấn" },
    { value: "6", label: "Công ty thành viên hệ sinh thái" },
  ],
} as const;

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const process = {
  eyebrow: "Quy trình",
  title: "Từ chiến lược đến thực thi",
  subtitle:
    "Một lộ trình rõ ràng, đo lường được — đồng hành cùng bạn ở mọi giai đoạn.",
  steps: [
    {
      step: "01",
      title: "Lắng nghe & Đánh giá",
      description:
        "Thấu hiểu mục tiêu, thực trạng và thách thức của doanh nghiệp qua phiên tư vấn chuyên sâu.",
    },
    {
      step: "02",
      title: "Hoạch định chiến lược",
      description:
        "Xây dựng lộ trình quản trị, ưu tiên hành động và các chỉ số thành công cụ thể.",
    },
    {
      step: "03",
      title: "Đồng hành thực thi",
      description:
        "Trực tiếp tham gia vận hành, dẫn dắt đội ngũ và triển khai giải pháp đến kết quả.",
    },
    {
      step: "04",
      title: "Đo lường & Tối ưu",
      description:
        "Theo dõi hiệu quả, điều chỉnh liên tục và chuyển giao năng lực cho đội ngũ nội bộ.",
    },
  ] satisfies ProcessStep[],
} as const;

export type EcosystemMember = {
  name: string;
  role: string;
  logo: string; // path under /public
};

export const ecosystem = {
  eyebrow: "Hệ sinh thái WTP",
  title: "Một hệ sinh thái — đồng hành trọn vẹn",
  subtitle:
    "WTP Advisory là một phần của hệ sinh thái WTP, kết nối đầy đủ năng lực để doanh nghiệp tăng trưởng và vươn ra toàn cầu.",
  members: [
    { name: "WTP Advisory", role: "Cố vấn quản trị thuê ngoài", logo: "/wtp-logo.png" },
    { name: "WTP Capital", role: "Đầu tư & đại diện quỹ", logo: "/ecosystem/wtp-capital.png" },
    { name: "ATP Accounting", role: "Tài chính – Kế toán – Thuế", logo: "/ecosystem/atp.png" },
    { name: "H2O Brand", role: "Marketing & Thương hiệu", logo: "/ecosystem/h2o.png" },
    { name: "GCW", role: "Tư vấn & triển khai nhân sự", logo: "/ecosystem/gcw.png" },
    { name: "Dragon Navi", role: "Tư vấn đầu tư & gọi vốn", logo: "/ecosystem/dragon-navi.png" },
  ] satisfies EcosystemMember[],
} as const;

export const ctaBand = {
  title: "Sẵn sàng khai phóng tiềm năng lãnh đạo của bạn?",
  description:
    "Đặt lịch một phiên tư vấn miễn phí với chuyên gia WTP Advisory để cùng vạch ra lộ trình tăng trưởng cho doanh nghiệp.",
  primaryCta: { label: "Đặt lịch tư vấn miễn phí", href: "#lien-he" },
  secondaryCta: { label: "Tải brochure", href: "#" }, // TODO: link brochure thật
} as const;

export const contact = {
  eyebrow: "Liên hệ",
  title: "Bắt đầu hành trình cùng WTP Advisory",
  about:
    "WTP Advisory — đơn vị cố vấn quản trị thuê ngoài thuộc hệ sinh thái WTP, đồng hành cùng doanh nghiệp Việt từ chiến lược đến thực thi.",
  address: "TP. Hồ Chí Minh, Việt Nam", // TODO: địa chỉ đầy đủ
  phone: "+84 28 0000 0000", // TODO
  email: "info@wtpadvisory.vn", // TODO
  taxCode: company.taxCode,
  formNote:
    "Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.",
} as const;

export const footer = {
  description:
    "Cố vấn Quản trị thuê ngoài cho doanh nghiệp Việt — khai phóng lãnh đạo, bứt phá tăng trưởng.",
  columns: [
    {
      title: "Dịch vụ",
      links: [
        { label: "Cố vấn quản trị", href: "#dich-vu" },
        { label: "Chiến lược & Quản trị", href: "#dich-vu" },
        { label: "Tài chính – Kế toán", href: "#dich-vu" },
        { label: "Marketing & Thương hiệu", href: "#dich-vu" },
      ],
    },
    {
      title: "Công ty",
      links: [
        { label: "Vì sao chọn WTP", href: "#vi-sao" },
        { label: "Quy trình", href: "#quy-trinh" },
        { label: "Hệ sinh thái", href: "#he-sinh-thai" },
        { label: "Liên hệ", href: "#lien-he" },
      ],
    },
  ],
  legal: `© ${"2026"} Công ty TNHH WTP Advisory · MST ${company.taxCode}`,
} as const;
