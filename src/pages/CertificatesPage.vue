<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import VBadge from '../components/VBadge.vue';

const router = useRouter();

const certificates = ref([
  {
    id: 1,
    courseName: 'Advanced JavaScript',
    completedDate: '2025-10-15',
    instructor: 'Mike Chen',
    certificateId: 'CERT-2025-001',
    thumbnail: '⚡'
  }
]);

const downloadCertificate = (cert) => {
  alert(`Downloading certificate for ${cert.courseName}`);
};

const shareCertificate = (cert) => {
  alert('Share functionality coming soon!');
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">My Certificates 🏆</h2>
      <p class="text-gray-600 mt-2">{{ certificates.length }} {{ certificates.length === 1 ? 'certificate' : 'certificates' }} earned</p>
    </div>

    <!-- Certificates -->
    <div v-if="certificates.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VCard v-for="cert in certificates" :key="cert.id" class="p-6 hover:shadow-lg transition-shadow">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">{{ cert.thumbnail }}</div>
          <h3 class="font-bold text-xl text-gray-900 mb-2">{{ cert.courseName }}</h3>
          <p class="text-sm text-gray-600 mb-1">Instructor: {{ cert.instructor }}</p>
          <VBadge variant="success">Completed</VBadge>
        </div>

        <div class="space-y-2 text-sm text-gray-600 mb-4">
          <div class="flex justify-between">
            <span>Completion Date:</span>
            <span class="font-medium">{{ new Date(cert.completedDate).toLocaleDateString() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Certificate ID:</span>
            <span class="font-medium">{{ cert.certificateId }}</span>
          </div>
        </div>

        <div class="flex gap-2">
          <VButton class="flex-1" @click="downloadCertificate(cert)">
            ⬇️ Download
          </VButton>
          <VButton variant="outline" @click="shareCertificate(cert)">
            🔗 Share
          </VButton>
        </div>
      </VCard>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🏆</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
      <p class="text-gray-600 mb-6">Complete a course to earn your first certificate!</p>
      <VButton @click="router.push('/dashboard/courses')">
        View My Courses
      </VButton>
    </div>
  </div>
</template>
