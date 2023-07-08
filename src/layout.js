const layout = [
  {
    resource: "Users",
    icon: "bi-people",
    important_columns: ["id", "first_name", "last_name", "email", "role"],
    viewable_columns: [
      "id",
      "first_name",
      "last_name",
      "email",
      "role",
      "ph_number",
      "firebase_id",
      "description",
      "address",
      "age",
      "music_field_id",
      "membership_id",
      "bachelor_qualification",
      "master_qualification",
      "doctorate_qualification",
      "created_at",
    ],
    createable_columns: [
      "first_name",
      "last_name",
      "email",
      "role",
      "ph_number",
      "firebase_id",
      "description",
      "address",
      "age",
      "music_field_id",
      "membership_id",
      "bachelor_qualification",
      "master_qualification",
      "doctorate_qualification",
    ],
    editable_columns: [
      "first_name",
      "last_name",
      "email",
      "role",
      "ph_number",
      "firebase_id",
      "description",
      "address",
      "age",
      "music_field_id",
      "membership_id",
      "bachelor_qualification",
      "master_qualification",
      "doctorate_qualification",
    ],
    column_type: {
      first_name: {
        type: "text",
        value: null,
      },
      last_name: {
        type: "text",
        value: null,
      },
      email: {
        type: "email",
        value: null,
      },
      role: {
        type: "text",
        value: null,
      },
      ph_number: {
        type: "text",
        value: null,
      },
      firebase_id: {
        type: "text",
        value: null,
      },
      description: {
        type: "text",
        value: null,
      },
      address: {
        type: "text",
        value: null,
      },
      age: {
        type: "number",
        value: null,
      },
      music_field_id: {
        type: "number",
        value: null,
      },
      membership_id: {
        type: "number",
        value: null,
      },
      bachelor_qualification: {
        type: "text",
        value: null,
      },
      master_qualification: {
        type: "text",
        value: null,
      },
      doctorate_qualification: {
        type: "text",
        value: null,
      },
    },
  },

  {
    resource: "Classes",
    icon: "bi-book",
    important_columns: ["id", "description", "scheduled_at", "creator_id"],
    viewable_columns: [
      "id",
      "description",
      "scheduled_at",
      "creator_id",
      "created_at",
    ],
    createable_columns: [
      "description",
      "scheduled_at",
      "creator_id",
      "student_ids",
    ],
    editable_columns: ["description", "scheduled_at", "creator_id"],
    column_type: {
      description: {
        type: "text",
        value: null,
      },
      scheduled_at: {
        type: "datetime-local",
        value: null,
      },
      creator_id: {
        type: "number",
        value: null,
      },
      student_ids: {
        type: "text",
        value: null,
      },
    },
  },

  {
    resource: "Notes",
    icon: "bi-music-note-list",
    important_columns: ["id", "title", "creator_id", "tag_id"],
    viewable_columns: [
      "id",
      "title",
      "description",
      "creator_id",
      "tag_id",
      "audio_link",
      "image_link",
      "parent_tags",
      "created_at",
    ],
    createable_columns: [
      "title",
      "description",
      "creator_id",
      "audio_link",
      "image_link",
      "parent_tags",
    ],
    editable_columns: [
      "title",
      "description",
      "creator_id",
      "audio_link",
      "image_link",
      "parent_tags",
    ],
    column_type: {
      title: {
        type: "text",
        value: null,
      },
      description: {
        type: "text",
        value: null,
      },
      creator_id: {
        type: "number",
        value: null,
      },
      audio_link: {
        type: "text",
        value: null,
      },
      image_link: {
        type: "text",
        value: null,
      },
      parent_tags: {
        type: "text",
        value: null,
      },
    },
  },

  {
    resource: "Tags",
    icon: "bi-tags",
    important_columns: ["id", "name", "parent_id"],
    viewable_columns: ["id", "name", "parent_id"],
    createable_columns: ["id", "name", "parent_id"],
    editable_columns: ["id", "name", "parent_id"],
    column_type: {
      id: {
        type: "number",
        value: null,
      },
      name: {
        type: "text",
        value: null,
      },
      parent_id: {
        type: "number",
        value: null,
      },
    },
  },

  {
    resource: "Payments",
    icon: "bi-currency-rupee",
    important_columns: ["id", "status", "amount", "created_at"],
    viewable_columns: ["id", "status", "amount", "created_at"],
    createable_columns: ["studentId", "amount", "classIds"],
    editable_columns: ["amount", "status"],
    column_type: {
      studentId: {
        type: "number",
        value: null,
      },
      amount: {
        type: "number",
        value: null,
      },
      classIds: {
        type: "text",
        value: null,
      },
      status: {
        type: "dropdown",
        value: ["pending", "paid", "failed"],
      },
    },
  },
];

export default layout;
