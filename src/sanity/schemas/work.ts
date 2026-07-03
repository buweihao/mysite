import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "作品",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "链接 Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "摘要",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "string",
      options: {
        list: [
          { title: "视觉", value: "视觉" },
          { title: "软件", value: "软件" },
          { title: "硬件", value: "硬件" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "年份",
      type: "number",
      initialValue: new Date().getFullYear(),
      validation: (rule) => rule.required().integer().min(2000),
    }),
    defineField({
      name: "cover",
      title: "封面图",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "正文",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "cover",
    },
  },
});
