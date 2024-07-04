<template>
  <DefaultLayout :has-footer="true">
    <div class="flex w-full justify-center pt-32">
      <div class="container space-y-16 pb-[400px]">
        <div>
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <img src="@/assets/test-background.png" alt="" class="w-full rounded-3xl" />
            </div>
            <div class="flex flex-col justify-center">
              <h2 class="text-3xl">TÊN SỰ KIỆN</h2>
            </div>
          </div>
        </div>

        <div class="space-y-8 rounded-2xl bg-white p-8">
          <div class="grid grid-cols-4 gap-16">
            <div class="space-y-8">
              <h2 class="text-2xl font-bold">BAN TỔ CHỨC</h2>
              <div class="flex flex-col items-center gap-4">
                <img src="@/assets/test-organizer.png" alt="" class="w-full rounded-3xl" />

                <h3 class="text-xl">organizer's name</h3>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam deleniti soluta eum
                quia at quasi incidunt quos molestias magni fuga obcaecati commodi inventore autem
                voluptatum, totam tempora. Minima, neque nesciunt.
              </p>
            </div>
            <div class="col-span-3 space-y-8">
              <h2 class="text-2xl font-bold">THÔNG TIN SỰ KIỆN</h2>

              <p class="text-xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam recusandae debitis
                praesentium quas minus nihil possimus, provident reiciendis, quo nulla officiis qui
                odio ab nisi similique sunt sit dolorum labore. Blanditiis animi earum
                exercitationem necessitatibus? Aliquam enim assumenda adipisci facere! Voluptatibus
                nisi ex repudiandae impedit eligendi dolores quas odit laborum modi quasi,
                distinctio, ratione incidunt voluptatem! Tenetur fuga voluptas et! Suscipit,
                voluptate accusamus officia dolorum exercitationem adipisci ut quidem obcaecati sunt
                quisquam! Corrupti nulla, aliquam, voluptatibus quas magni, beatae blanditiis iusto
                enim mollitia cumque saepe dolores neque ea qui voluptatem. Eum recusandae et,
                numquam natus rerum sed maiores perferendis temporibus obcaecati enim eos quas
                necessitatibus, odit fugiat dolores qui praesentium optio, asperiores labore
                inventore! Harum sit modi dolores incidunt aperiam? Qui soluta labore cum delectus
                incidunt distinctio consequuntur, temporibus odit id laudantium placeat itaque
                neque! Debitis aspernatur ratione, perspiciatis, eaque vero quidem animi delectus
                ducimus ab provident quasi quam eveniet? Soluta asperiores dicta odit, ipsa, dolorum
                ducimus totam vel libero minima sapiente earum rerum neque suscipit aut quisquam
                odio dignissimos voluptas quasi perferendis autem assumenda ut? Ipsum vero earum
                illo. Repellat velit, accusamus laboriosam numquam fugit iste deserunt ea cum rem
                blanditiis magni possimus quaerat, odio id non? Nostrum totam vero voluptate aliquam
                iste dolorum voluptatibus. Voluptate illum earum sunt. Architecto quaerat provident
                optio! Eveniet nesciunt dolorum, natus temporibus autem aperiam placeat eius
                delectus itaque alias. Facere voluptatibus ipsam optio quos quaerat tenetur dolorum
                aut, in nostrum laboriosam corporis porro. Iste, cupiditate numquam. Ipsam animi
                repellendus ea eos nihil suscipit incidunt veniam. Necessitatibus, veritatis. Dolore
                dolorum consequuntur saepe doloribus atque a maiores aliquam est adipisci, ad ipsam
                optio harum eum. Recusandae vero harum veniam nobis repellendus perspiciatis
                eligendi amet modi consequatur excepturi, tenetur sed, dolores officia nesciunt
                molestias quo quia tempore provident esse cumque commodi quod est? Magnam, rem!
                Voluptatibus.
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold">HẠNG VÉ</h2>

          <div class="rounded-md border p-0">
            <div class="flex h-16 items-center p-4 text-xl">
              <p class="font-semibold">Thông tin vé</p>
            </div>
            <Accordion class="border-t">
              <AccordionTab header="16:30 - 18:30, 13 tháng 07, 2024">
                <p class="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </AccordionTab>
              <AccordionTab header="16:30 - 18:30, 14 tháng 07, 2024">
                <p class="m-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
                  velit, sed quia non numquam eius modi.
                </p>
              </AccordionTab>
              <AccordionTab header="16:30 - 18:30, 14 tháng 07, 2024">
                <p class="m-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                  praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                  excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                  officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                  rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                  eligendi optio cumque nihil impedit quo minus.
                </p>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
