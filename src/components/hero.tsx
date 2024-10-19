import React from 'react';
import { title, subtitle } from '@/components/primitives';

export const Hero = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="inline-block max-w-3xl text-center">
        <h1 className={title()}>
          Free <span className={title({ color: 'violet' })}>Unlimited</span>{' '}
          File Converter
        </h1>
        <br />
        <p className={subtitle({ class: 'mt-4 max-w-xl mx-auto' })}>
          Transform your images, audio, and videos with our free file converter.
          Enjoy limitless, seamless conversions that elevate your content in
          just a few clicks!
        </p>
      </div>
    </section>
  );
};
