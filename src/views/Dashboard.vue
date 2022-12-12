<template>
  <c-box bg="#E5E5E5" w="100vw" h="100vh">
    <c-text bg="#FFF0CB" textAlign="center" p="2" v-if="!isVerifiedAt">
      You have not verified your email address. Click 
        <c-link @click="onVerifyAccount" color="blue">here</c-link> 
      to resend verification link.
    </c-text>
    <c-flex bg="#FFFFFF" w="100%" h="75px" border="1px solid #F0F0F0" justifyContent="space-between" alignItems="center" px="10">
      <c-heading fontWeight="600" fontSize="16px" color="#000000">Dashboard</c-heading>
      <c-menu>
        <c-menu-button bg="transparent" right-icon="triangle-down">
          {{ currentUser.first_name }} {{ currentUser.last_name }}
        </c-menu-button>
        <c-menu-list>
          <c-menu-item @click="onLogOut" color="#F41E10">Log Out</c-menu-item>
        </c-menu-list>
      </c-menu>
    </c-flex>
    <c-box w="100%" h="100%" px="10" py="10">
      <c-stack w="100%" marginY="5" justifyContent="center" alignSelf="center" v-if="isLoading">
        <c-spinner thickness="4px" speed="0.65s" empty-color="green.200" color="vue.500" size="xl" />
      </c-stack>
      <c-simple-grid :columns="[1, null, 3]" spacing="20px" v-else>
        <c-box v-for="(item, index) in items" :key="index">
          <c-stack bg="#FFFFFF" border="1px solid #F0F0F0" borderRadius="8px" p="20px">
            <c-stack>
              <c-box>
                <c-text fontWeight="400" fontSize="12px" color="#555658" lineHeight="15px">
                  Name
                </c-text>
                <c-heading fontWeight="500" fontSize="16px" color="#000000" lineHeight="20px">
                  {{ item.name }}
                </c-heading>
              </c-box>
              <c-box>
                <c-text fontWeight="400" fontSize="12px" color="#555658" lineHeight="15px">
                  Description
                </c-text>
                <c-text fontWeight="400" fontSize="14px" color="#131415" lineHeight="17px">
                  {{ item.description }}
                </c-text>
              </c-box>
            </c-stack>
            <c-flex justifyContent="end">
              <c-button-group :spacing="4">
                <c-button variant="outline" size="sm" border="1px solid #555658" color="#555658" @click="onOpen(item)">
                  Edit
                </c-button>
                <c-button size="sm" bg="#555658" borderRadius="4px" color="#FFFFFF" @click="onDelete(item)">
                  Delete
                </c-button>
              </c-button-group>
            </c-flex>
          </c-stack>
        </c-box>
      </c-simple-grid>
    </c-box>
    <c-box position="absolute" bottom="30px" right="50px" @click="onOpen(formData)">
      <c-icon-button aria-label="create item" color="#004CBD" bg="transparent" icon="circle-plus" fontSize="40px" />
    </c-box>
    <c-modal
      isCentered
      :is-open="isOpen"
      :on-close="onClose"
    >
      <c-modal-content ref="content" borderRadius="4px">
        <c-modal-header fontFamily="Avenir" color="#000000" fontSize="14px" fontWeight="400" borderBottom="1px solid #EFEFF0">
          Create Item
        </c-modal-header>
        <c-modal-body>
          <c-stack>
            <c-form-control>
              <c-form-label for="email" fontSize="14px" lineHeight="19px" fontWeight="400">Name</c-form-label>
              <c-input
                :value="formData.name"
                type="text"
                id="name"
                placeholder="Input item name here"
                @change="handleInputChange"
              />
            </c-form-control>
            <c-form-control>
              <c-form-label for="description" fontSize="14px" lineHeight="19px" fontWeight="400">Add Note</c-form-label>
              <textarea
                :value="formData.description"
                id="description"
                name="description"
                ref="description"
                placeholder="Type here"
                resize="none"
                @input="handleInputChange"
              />
            </c-form-control>
          </c-stack>
        </c-modal-body>
        <c-modal-footer fontWeight="500" fontSize="16px">
          <c-button mr="3" @click="onClose">Cancel</c-button>
          <c-button bg="#999A9B" color="#FFFFFF" :is-loading="isLoading" @click="onUpdate" v-if="formData.uuid">
            Update Event
          </c-button>
          <c-button bg="#999A9B" color="#FFFFFF" :is-loading="isLoading" @click="onCreate" v-else>
            Create Event
          </c-button>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </c-box>
</template>

<script lang="ts">
import axios from 'axios'
import { mapState, mapActions } from "redux-vuex"
import { Component, Vue } from 'vue-property-decorator'
import * as Actions from "../redux/actions"
import {
  CBox,
  CFlex,
  CStack,
  CHeading,
  CText,
  CMenu,
  CMenuButton,
  CMenuList,
  CMenuItem,
  CSimpleGrid,
  CButton,
  CButtonGroup,
  CIconButton,
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CInput,
  CTextarea,
  CLink,
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
  CSpinner
} from '@chakra-ui/vue'

@Component({
  components: {
    CFlex,
    CBox,
    CStack,
    CHeading,
    CMenu,
    CText,
    CMenuButton,
    CMenuList,
    CMenuItem,
    CSimpleGrid,
    CButton,
    CButtonGroup,
    CIconButton,
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CInput,
    CTextarea,
    CLink,
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
    CSpinner
  },
  data: mapState({
    items: state => state.items,
    isOpen: state => state.isOpen,
    formData: state => state.formData,
    isLoading: state => state.isLoading,
    currentUser: state => state.currentUser,
    isVerifiedAt: state => state.isVerifiedAt,
  }),
  methods: mapActions({
    handleInputChange({ dispatch, getState }, $event){
      dispatch(Actions.setFormAction({
        id: $event.target.id,
        value: $event.target.value
      }))
    },
    onOpen: ({ dispatch }, payload) => {
       dispatch(Actions.clearFormAction({}))
      if(Object.keys(payload).length){
        axios.get(`/items/${payload.uuid}`).then(({ data }) => {
          dispatch(Actions.editItem(data.item))
        })
      } else dispatch(Actions.openModal())
    },
    onClose: ({ dispatch }) => {
      dispatch(Actions.closeModal({}))
      dispatch(Actions.clearFormAction({}))
    },
    onDelete: async ({ dispatch, getState }, payload) => {
      const state = await getState()
      dispatch(Actions.isLoading({}))
      await axios.delete(`/items/${payload.uuid}`).then(() => {
        dispatch(Actions.removeItem(payload.uuid))
      })
    },
    onUpdate: ({ dispatch, getState }) => {
      dispatch(Actions.isLoading({}))
      const state =  getState()
      axios.put(`/items/${state.formData.uuid}`, {
        name: state.formData.name,
        description: state.formData.description
      }).then(({ data }) => {
        dispatch(Actions.updateItem(data.item))
        dispatch(Actions.clearFormAction({}))
      })
    },
    onCreate: ({ dispatch, getState }) => {
      const state = getState()
      dispatch(Actions.isLoading({}))
      axios.post('/items', {
        name: state.formData.name,
        description: state.formData.description
      }).then(({ data }) => {
        dispatch(Actions.addItem(data.item))
        dispatch(Actions.clearFormAction({}))
      })
    },
    onVerifyAccount({ dispatch, getState }){
      const state = getState()
      axios.post('/me/verification-email/send',{
        email_verification_token: state.verifyToken
      }).then(({ data }) => {
        this.$toast({
          title: 'Mail Sent!',
          description: data.message,
          status: 'success',
          duration: 3000
        })
      }).catch((error) => {
        this.$toast({
          title: 'Verification Failed!',
          description: error.message,
          status: 'error',
          duration: 3000
        })
      })
    },
    onLogOut({ dispatch }){
      dispatch(Actions.logout({}))
      this.$router.push({ name: 'Login' })
    },
    async fetchAllItems({ dispatch, getState }) {
      const state = await getState()
      await axios.get('/items').then(({ data }) => {
        dispatch(Actions.fetchAllItems(data.items))
      })
    },
  }),
  created(){
    if(this.store.getState().authToken){
      this.fetchAllItems(this.store.getState().authToken)
    }
    this.store.subscribe(() => {
      console.log('SUBSCRIBE', this.store.getState());
    });
  }
})
export default class Dashboard extends Vue {}
</script>
<style scoped>
 textarea {
   width: 100%;
   height: 80px;
   border: 1px solid #EEEEEE;
   border-radius: 5px;
   padding: 10px 20px;
   resize: none;
 }
</style>
