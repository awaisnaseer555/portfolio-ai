import Image from "next/image";
import { SITE } from "@/config/site";

/** Replace the file at SITE.profileImage with your photo (portrait, ~800x1000). */
export default function ProfilePhoto() {
  return (
    <figure className="mx-auto w-full max-w-xs">
      <div className="rounded-3xl bg-gradient-to-br from-brand via-accent to-accent p-[3px] shadow-xl shadow-brand/20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-card">
          <Image src={SITE.profileImage} alt={`Portrait of ${SITE.fullName}`} fill priority sizes="320px" className="object-cover" />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-mute">{SITE.fullName}</figcaption>
    </figure>
  );
}
