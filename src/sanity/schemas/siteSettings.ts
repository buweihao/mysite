import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "网站设置",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "网站标题",
      type: "string",
      initialValue: "buweihao",
    }),
    defineField({
      name: "description",
      title: "网站描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroTitle",
      title: "首页大标题",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "首页介绍文字",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contactIntro",
      title: "联系页介绍文字",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "联系邮箱",
      type: "email",
    }),
    defineField({
      name: "socialUrl",
      title: "社交链接",
      type: "url",
    }),
  ],
});
