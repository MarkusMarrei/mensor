<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../../stores/app';
import { X, Camera, Trash2, Check } from 'lucide-vue-next';

const appStore = useAppStore();

const firstName = ref(appStore.settings.userFirstName || appStore.settings.userName || '');
const lastName = ref(appStore.settings.userLastName || '');
const bio = ref(appStore.settings.userBio || '');
const avatar = ref<string | null>(appStore.settings.userAvatar || null);
const fileInputRef = ref<HTMLInputElement | null>(null);

function handleAvatarUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    if (evt.target?.result) {
      avatar.value = evt.target.result as string;
    }
  };
  reader.readAsDataURL(file);
}

function removeAvatar() {
  avatar.value = null;
}

async function handleSave() {
  await appStore.updateProfile({
    firstName: firstName.value.trim() || 'Пользователь',
    lastName: lastName.value.trim(),
    bio: bio.value.trim(),
    avatar: avatar.value,
  });
  appStore.showProfileModal = false;
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
      <!-- Header -->
      <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h3 class="text-base font-bold text-zinc-900">{{ appStore.t.profile.title }}</h3>
        <button
          class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition"
          @click="appStore.showProfileModal = false"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Form Content -->
      <div class="p-6 flex-1 overflow-y-auto space-y-5">
        <!-- Avatar Section -->
        <div class="flex flex-col items-center">
          <div class="relative group">
            <div class="w-24 h-24 rounded-full overflow-hidden shadow-float ring-4 ring-zinc-100 bg-zinc-100 flex items-center justify-center">
              <img
                v-if="avatar"
                :src="avatar"
                alt="User Avatar"
                class="w-full h-full object-cover"
              />
              <img
                v-else
                src="/Mensor.jpg"
                alt="Default Logo"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Upload trigger badge -->
            <button
              class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-mensor-red text-white flex items-center justify-center shadow-md hover:bg-mensor-red-dark transition active:scale-95"
              @click="fileInputRef?.click()"
              :title="appStore.t.profile.uploadPhoto"
            >
              <Camera class="w-4 h-4" />
            </button>
          </div>

          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleAvatarUpload"
          />

          <div class="flex items-center gap-3 mt-3">
            <button
              class="text-xs font-semibold text-mensor-red hover:underline"
              @click="fileInputRef?.click()"
            >
              {{ avatar ? appStore.t.profile.changePhoto : appStore.t.profile.uploadPhoto }}
            </button>
            <span v-if="avatar" class="text-zinc-300">•</span>
            <button
              v-if="avatar"
              class="text-xs text-zinc-400 hover:text-red-500 flex items-center gap-1 transition"
              @click="removeAvatar"
            >
              <Trash2 class="w-3 h-3" />
              <span>{{ appStore.t.profile.removePhoto }}</span>
            </button>
          </div>
        </div>

        <!-- Name Inputs -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-zinc-700 mb-1">{{ appStore.t.profile.firstName }}</label>
            <input
              type="text"
              v-model="firstName"
              :placeholder="appStore.t.profile.firstNamePlaceholder"
              class="w-full text-sm px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red transition"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-700 mb-1">{{ appStore.t.profile.lastName }}</label>
            <input
              type="text"
              v-model="lastName"
              :placeholder="appStore.t.profile.lastNamePlaceholder"
              class="w-full text-sm px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red transition"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-700 mb-1">{{ appStore.t.profile.bio }}</label>
            <textarea
              v-model="bio"
              rows="3"
              :placeholder="appStore.t.profile.bioPlaceholder"
              class="w-full text-xs px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red transition resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-zinc-100 bg-zinc-50/50">
        <button
          class="w-full py-3 bg-mensor-dark text-white rounded-2xl font-semibold text-sm shadow-float hover:bg-black transition active:scale-[0.98] flex items-center justify-center gap-2"
          @click="handleSave"
        >
          <Check class="w-4 h-4" />
          <span>{{ appStore.t.profile.saveProfile }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
