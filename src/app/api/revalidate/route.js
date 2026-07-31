import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { tag, secret } = await request.json();

    // يمكنك إضافة حماية هنا باستخدام secret token
    // if (secret !== process.env.REVALIDATION_SECRET) {
    //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    // }

    if (!tag) {
      return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
