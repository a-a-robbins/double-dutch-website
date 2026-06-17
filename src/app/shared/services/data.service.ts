import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';
import { ClassOffering } from '../models/class.model';
import { Announcement } from '../models/announcement.model';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getCoaches(): Coach[] {
    return [
      {
        id: 1,
        name: 'Attie Doak',
        title: 'HEAD COACH',
        imagePath: 'assets/DoubleDutch-Images/attie-profile.webp',
        bio: `My love for gymnastics started at seven years old, I was determined to teach myself with the help from an amazing neighbor. The greatest gift for my 9th birthday was my mom signing me up for a gymnastics class and I was hooked!

I was a gymnast until 17 when I discovered my love for teaching others gymnastics. I've never looked back, teaching others gymnastics quickly became my passion. Teaching came pretty natural, I've always enjoyed being the 3rd of eight children who also homeschooled. So teaching others has also been an important part of my life as long as I can remember.

I started as a Junior Coach at 12 years old helping as many classes as I could. At 16, I became a coach of our competition team. At 18, I took on head coaching responsibilities for our competition team, including teaching routines, cleaning routines, travel, and being their cheerleader for every win or loss which was a valuable learning experience.

I've taught all ages from 18 months to 18 years both girls and boys. I've also done cheer clinics and love working with Cheerleaders to help improve flexibility, stunts and more. I find that teaching little gymnasts self confidence and that hard work, practice and discipline will help them develop the skills necessary for any challenge they face as they become young adults. Watching their confidence, work ethic and skills grow is what makes me love teaching gymnastics more and more everyday. I can't wait to teach and develop your little gymnast at Double Dutch Gymnastics!`
      },
      {
        id: 2,
        name: 'Gena Doak',
        title: 'ASSISTANT COACH',
        imagePath: 'assets/DoubleDutch-Images/gena-profile.webp',
        bio: `I started gymnastics at the age of four and continued over the past six years with my love for the sport. I homeschool daily with a focus on learning responsibility, my education, and of course, playing hard.

I also love music and singing. I participate in choir and take violin & piano lessons.

I enjoy the opportunity to teach others gymnastics skills safely while helping them to build their confidence in the sport as I continue to grow in the gymnastics community.`
      },
      {
        id: 3,
        name: 'Gib Doak',
        title: 'JUNIOR COACH ASSISTANT',
        imagePath: 'assets/DoubleDutch-Images/gib-profile.webp',
        bio: `I started gymnastics at the age of four and continued over the past six years with my love for the sport. I homeschool daily with a focus on learning responsibility, my education, and of course, playing hard.

I also love music and singing. I participate in choir and take violin & piano lessons.

I enjoy the opportunity to teach others gymnastics skills safely while helping them to build their confidence in the sport as I continue to grow in the gymnastics community.`
      },
      {
        id: 4,
        name: 'Ruth',
        title: 'MEET THE TEAM',
        imagePath: 'assets/DoubleDutch-Images/ruth-profile.webp',
        bio: `I am currently enjoying my freshman year in high school. I live on a farm and enjoy doing anything outdoors. I have 10 nieces and nephews, and love doing things with them. I've had an interest in gymnastics for as long as I can remember, and I'm excited to help your gymnasts!`
      }
    ];
  }

  getClasses(): ClassOffering[] {
    return [
      {
        id: 1,
        name: 'Mommy & Me',
        ageRange: 'Ages 18mo - 2.5 years',
        imagePath: 'assets/DoubleDutch-Images/4I6A3005.webp',
        duration: '30 minutes',
        description: 'Fun-based program that encourages bonding between parent and child during their fundamental developing stage. These classes are entry level and fun, with the goal of practicing following along in a group activity. We expect your children to possibly cry, protest, and or throw a fit. It\'s all part of the process of learning a new skill. DDG is always a guilt free parent zone.',
        details: [
          '10 minute game and stretch',
          '20 minutes of structured rotations',
          'Bars, Beams, Tumbling',
          'Fine motor skills, grip strength, spatial awareness, body awareness'
        ]
      },
      {
        id: 2,
        name: 'Toddlers',
        ageRange: 'Ages 2.5 - 4.5 years',
        imagePath: 'assets/DoubleDutch-Images/toddler-bar.webp',
        duration: '30 minutes',
        description: 'Fun-filled classes focused on learning in a safe and loving environment that is focused on learning how to be in a class and following in line. Along with the foundation of gymnastics!',
        details: [
          '10 minute game and stretch',
          '20 minutes of structured rotation',
          'Bars, beams, tumbling, climbing',
          'Fine motor skills, hand-eye coordination'
        ]
      },
      {
        id: 3,
        name: 'Kids',
        ageRange: 'Ages 4.5 - 6.5 years',
        imagePath: 'assets/DoubleDutch-Images/recreational.webp',
        duration: '45 minutes',
        description: 'Fun-filled classes all about improvement! Your child will be encouraged to always try their best and strive to become better during every class.',
        details: [
          '10 minutes of warm up games and stretching',
          '35 minutes of structured rotations',
          'Vault, Bars, Beam, Tumbling'
        ]
      },
      {
        id: 4,
        name: 'Recreational',
        ageRange: 'Ages 6.5+',
        imagePath: 'assets/DoubleDutch-Images/4I6A2769.webp',
        duration: '60 minutes',
        description: 'Fun-based classes all about success! Your child will be encouraged to succeed in everything they do, whether that takes a day or a year!',
        details: [
          '15 minutes of warm ups and stretching',
          '45 minutes of structured rotations and stations',
          'Vault, Bars, Beam, Tumbling'
        ]
      },
      {
        id: 5,
        name: 'Pre-Team',
        ageRange: 'Ages 5+',
        imagePath: 'assets/DoubleDutch-Images/kid-handstand.webp',
        duration: '90 minutes',
        description: 'This program is not a team commitment but the step before the team commitment. Parents must inquire by emailing ddgymnastics23@gmail.com',
        details: [
          'Once weekly (may be twice weekly depending on skill level)',
          'Learning fundamentals of gymnastics',
          'Safety when falling, routine memorization',
          'Good attitudes and confidence building'
        ]
      }
    ];
  }

  getAnnouncements(): Announcement[] {
    return [];
  }

  getSchedules(): Schedule[] {
    return [
      {
        id: 1,
        title: 'Summer 2026 Schedule',
        imagePath: 'assets/summer-26-schedule.webp',
        description: 'Current summer session schedule'
      }
    ];
  }
}
