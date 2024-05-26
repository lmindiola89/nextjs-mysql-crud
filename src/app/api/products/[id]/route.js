import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";
import { unlink } from "fs/promises";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM product WHERE id = ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const image = data.get("image");
    const updateData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
    };

    // if (!data.get("name")) {
    //   return NextResponse.json(
    //     {
    //       message: "Name is required",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    if (image) {
      const filePath = await processImage(image);
      const res = await cloudinary.uploader.upload(filePath);
      updateData.image = res.secure_url;

      if (res) {
        await unlink(filePath);
      }
    }

    const result = await conn.query("UPDATE product SET ? WHERE id = ?", [
      updateData,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
    const updateProduct = await conn.query(
      "SELECT * FROM product WHERE id = ?",
      [params.id]
    );
    return NextResponse.json(updateProduct[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
