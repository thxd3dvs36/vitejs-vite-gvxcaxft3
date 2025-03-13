"use client"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { useState, useEffect } from "react"
import {
  Calendar,
  Home,
  Package,
  Plus,
  ShoppingCart,
  Trash,
  Users,
  Edit,
  ChevronDown,
  ChevronUp,
  Clock,
  Check,
  Download,
  Play,
  Square,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

// Sample client data
const initialClients = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 5,
    birthdate: "2019-04-12",
    parents: "Sarah & Michael Johnson",
    address: "123 Maple Street, Springfield",
    phone: "(555) 123-4567",
    emergencyContact: "Michael Johnson - (555) 987-6543",
    avatar: "/placeholder.svg?height=80&width=80",
    lastVisit: "2024-03-15",
    totalHours: 38,
    todayHours: 1.5,
    visits: [
      { date: "2024-03-15", duration: "2 hours", activity: "Art & Crafts" },
      { date: "2024-03-08", duration: "2 hours", activity: "Storytime" },
      { date: "2024-03-01", duration: "2 hours", activity: "Music & Movement" },
    ],
  },
  {
    id: 2,
    name: "Noah Williams",
    age: 4,
    birthdate: "2020-01-23",
    parents: "Jennifer & David Williams",
    address: "456 Oak Avenue, Riverdale",
    phone: "(555) 234-5678",
    emergencyContact: "Jennifer Williams - (555) 876-5432",
    avatar: "/placeholder.svg?height=80&width=80",
    lastVisit: "2024-03-14",
    totalHours: 42,
    todayHours: 2,
    visits: [
      { date: "2024-03-14", duration: "2 hours", activity: "Science Exploration" },
      { date: "2024-03-07", duration: "2 hours", activity: "Building Blocks" },
      { date: "2024-02-29", duration: "2 hours", activity: "Outdoor Play" },
    ],
  },
  {
    id: 3,
    name: "Olivia Davis",
    age: 6,
    birthdate: "2018-07-05",
    parents: "Emily & James Davis",
    address: "789 Pine Road, Lakeside",
    phone: "(555) 345-6789",
    emergencyContact: "James Davis - (555) 765-4321",
    avatar: "/placeholder.svg?height=80&width=80",
    lastVisit: "2024-03-13",
    totalHours: 56,
    todayHours: 0,
    visits: [
      { date: "2024-03-13", duration: "2 hours", activity: "Reading Circle" },
      { date: "2024-03-06", duration: "2 hours", activity: "Math Games" },
      { date: "2024-02-28", duration: "2 hours", activity: "Art & Crafts" },
    ],
  },
  {
    id: 4,
    name: "Liam Brown",
    age: 5,
    birthdate: "2019-09-18",
    parents: "Jessica & Robert Brown",
    address: "101 Cedar Lane, Hillcrest",
    phone: "(555) 456-7890",
    emergencyContact: "Jessica Brown - (555) 654-3210",
    avatar: "/placeholder.svg?height=80&width=80",
    lastVisit: "2024-03-12",
    totalHours: 34,
    todayHours: 1,
    visits: [
      { date: "2024-03-12", duration: "2 hours", activity: "Music & Movement" },
      { date: "2024-03-05", duration: "2 hours", activity: "Dramatic Play" },
      { date: "2024-02-27", duration: "2 hours", activity: "Science Exploration" },
    ],
  },
  {
    id: 5,
    name: "Sophia Miller",
    age: 4,
    birthdate: "2020-03-30",
    parents: "Amanda & Thomas Miller",
    address: "202 Birch Street, Meadowbrook",
    phone: "(555) 567-8901",
    emergencyContact: "Thomas Miller - (555) 543-2109",
    avatar: "/placeholder.svg?height=80&width=80",
    lastVisit: "2024-03-11",
    totalHours: 28,
    todayHours: 0.5,
    visits: [
      { date: "2024-03-11", duration: "2 hours", activity: "Sensory Play" },
      { date: "2024-03-04", duration: "2 hours", activity: "Art & Crafts" },
      { date: "2024-02-26", duration: "2 hours", activity: "Storytime" },
    ],
  },
]

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Playground Snack Pack",
    quantity: 10,
    price: 4.99,
    description: "Assorted healthy snacks for kids",
    lowStock: true,
  },
  {
    id: 2,
    name: "Bubble Wand Set",
    quantity: 30,
    price: 6.99,
    description: "Set of 3 bubble wands with solution",
    lowStock: false,
  },
  {
    id: 3,
    name: "Play Pass (1 hour)",
    quantity: 100,
    price: 8.99,
    description: "1 hour playground access ticket",
    lowStock: false,
  },
  {
    id: 4,
    name: "Craft Supply Kit",
    quantity: 5,
    price: 12.99,
    description: "Art supplies for creative activities",
    lowStock: true,
  },
  {
    id: 5,
    name: "Playground Membership (Monthly)",
    quantity: 15,
    price: 49.99,
    description: "Monthly unlimited access pass",
    lowStock: false,
  },
]

// Sample invoice data
const initialInvoices = [
  {
    id: "INV-001",
    clientId: 1,
    clientName: "Emma Johnson",
    status: "pending",
    total: 22.97,
    createdAt: "2024-03-15 14:30",
    items: [
      { productId: 1, name: "Playground Snack Pack", quantity: 2, price: 4.99 },
      { productId: 3, name: "Play Pass (1 hour)", quantity: 1, price: 8.99 },
      { productId: 2, name: "Bubble Wand Set", quantity: 1, price: 6.99 },
    ],
    playTime: { hours: 1, minutes: 0, rate: 8.99 },
    discount: 0,
    notes: "",
  },
  {
    id: "INV-002",
    clientId: 3,
    clientName: "Olivia Davis",
    status: "completed",
    total: 62.97,
    createdAt: "2024-03-14 10:15",
    items: [
      { productId: 5, name: "Playground Membership (Monthly)", quantity: 1, price: 49.99 },
      { productId: 4, name: "Craft Supply Kit", quantity: 1, price: 12.99 },
    ],
    playTime: { hours: 0, minutes: 0, rate: 8.99 },
    discount: 0,
    notes: "Monthly membership renewal",
  },
  {
    id: "INV-003",
    clientId: 2,
    clientName: "Noah Williams",
    status: "pending",
    total: 17.98,
    createdAt: "2024-03-13 16:45",
    items: [{ productId: 3, name: "Play Pass (1 hour)", quantity: 2, price: 8.99 }],
    playTime: { hours: 2, minutes: 0, rate: 8.99 },
    discount: 0,
    notes: "",
  },
]

// Sample events data
const initialEvents = [
  {
    id: 1,
    name: "Noah's Birthday Party",
    type: "birthday",
    date: "2024-03-25",
    time: "14:00",
    hostClientId: 2,
    hostClientName: "Noah Williams",
    capacity: 15,
    confirmed: 12,
    specialRequirements: "Dinosaur theme, allergy to nuts",
  },
  {
    id: 2,
    name: "Spring Break Special",
    type: "private",
    date: "2024-04-02",
    time: "10:00",
    hostClientId: null,
    hostClientName: "School Group",
    capacity: 30,
    confirmed: 25,
    specialRequirements: "Educational activities for ages 5-7",
  },
  {
    id: 3,
    name: "Emma's Birthday Celebration",
    type: "birthday",
    date: "2024-04-12",
    time: "15:30",
    hostClientId: 1,
    hostClientName: "Emma Johnson",
    capacity: 10,
    confirmed: 8,
    specialRequirements: "Princess theme, cake provided by parents",
  },
]

// Sample active sessions data
const initialActiveSessions = [
  {
    id: 1,
    clientId: 1,
    clientName: "Emma Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    startTime: new Date(new Date().getTime() - 45 * 60000).toISOString(), // 45 minutes ago
    duration: 90, // 90 minutes total
    emergency: "Michael Johnson - (555) 987-6543",
    status: "active",
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Noah Williams",
    avatar: "/placeholder.svg?height=80&width=80",
    startTime: new Date(new Date().getTime() - 105 * 60000).toISOString(), // 1h 45m ago
    duration: 120, // 2 hours total
    emergency: "Jennifer Williams - (555) 876-5432",
    status: "ending-soon",
  },
  {
    id: 3,
    clientId: 4,
    clientName: "Liam Brown",
    avatar: "/placeholder.svg?height=80&width=80",
    startTime: new Date(new Date().getTime() - 55 * 60000).toISOString(), // 55 minutes ago
    duration: 60, // 1 hour total
    emergency: "Jessica Brown - (555) 654-3210",
    status: "ending-soon",
  },
  {
    id: 4,
    clientId: 5,
    clientName: "Sophia Miller",
    avatar: "/placeholder.svg?height=80&width=80",
    startTime: new Date(new Date().getTime() - 35 * 60000).toISOString(), // 35 minutes ago
    duration: 30, // 30 minutes total
    emergency: "Thomas Miller - (555) 543-2109",
    status: "expired",
  },
  {
    id: 5,
    clientId: 3,
    clientName: "Olivia Davis",
    avatar: "/placeholder.svg?height=80&width=80",
    startTime: new Date(new Date().getTime() - 10 * 60000).toISOString(), // 10 minutes ago
    duration: 120, // 2 hours total
    emergency: "James Davis - (555) 765-4321",
    status: "active",
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [clients, setClients] = useState(initialClients)
  const [products, setProducts] = useState(initialProducts)
  const [invoices, setInvoices] = useState(initialInvoices)
  const [events, setEvents] = useState(initialEvents)
  const [activeSessions, setActiveSessions] = useState(initialActiveSessions)
  const [selectedSessions, setSelectedSessions] = useState([])
  
  const [selectedClient, setSelectedClient] = useState(null)
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false)
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState(null)
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)
  const [clientToEdit, setClientToEdit] = useState(null)
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false)
  
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0])
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false)
  const [isEditInvoiceModalOpen, setIsEditInvoiceModalOpen] = useState(false)
  const [invoiceToEdit, setInvoiceToEdit] = useState(null)
  const [newInvoice, setNewInvoice] = useState({
    id: `INV-00${invoices.length + 1}`,
    clientId: null,
    clientName: "",
    status: "pending",
    total: 0,
    createdAt: new Date().toLocaleString(),
    items: [],
    playTime: { hours: 0, minutes: 0, rate: 8.99 },
    discount: 0,
    notes: ""
  })
  
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    id: events.length + 1,
    name: "",
    type: "birthday",
    date: "",
    time: "",
    hostClientId: null,
    hostClientName: "",
    capacity: 15,
    confirmed: 0,
    specialRequirements: ""
  })
  
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false)
  const [isEndSessionModalOpen, setIsEndSessionModalOpen] = useState(false)
  const [sessionToEnd, setSessionToEnd] = useState(null)
  const [newSession, setNewSession] = useState({
    clientId: null,
    clientName: "",
    duration: 60,
    timeHours: 1,
    timeMinutes: 0
  })
  
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [isLoading, setIsLoading] = useState(false)
  
  // Timer for active sessions
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSessions(prevSessions => {
        return prevSessions.map(session => {
          const startTime = new Date(session.startTime)
          const now = new Date()
          const elapsedMinutes = Math.floor((now - startTime) / 60000)
          const remainingMinutes = session.duration - elapsedMinutes
          
          let status = session.status
          if (remainingMinutes <= 0) {
            status = "expired"
            if (status !== "expired" && session.status !== "expired") {
              toast({
                title: "Session Expired",
                description: `${session.clientName}'s session has ended.`,
                variant: "destructive"
              })
            }
          } else if (remainingMinutes <= 15) {
            status = "ending-soon"
            if (status !== "ending-soon" && session.status !== "ending-soon" && session.status !== "expired") {
              toast({
                title: "Session Ending Soon",
                description: `${session.clientName}'s session will end in ${remainingMinutes} minutes.`,
              })
            }
          } else {
            status = "active"
          }
          
          return {
            ...session,
            status
          }
        })
      })
    }, 10000) // Update every 10 seconds
    
    return () => clearInterval(timer)
  }, [])
  
  // Client functions
  const openClientDetails = (client, e) => {
    e.stopPropagation()
    setSelectedClient(client)
    setIsClientModalOpen(true)
  }
  
  const handleEditClient = (client, e) => {
    e.stopPropagation()
    setClientToEdit({...client})
    setIsEditClientModalOpen(true)
  }
  
  const handleDeleteClient = (client, e) => {
    e.stopPropagation()
    setClientToDelete(client)
    setIsDeleteClientModalOpen(true)
  }
  
  const confirmDeleteClient = () => {
    setClients(clients.filter(c => c.id !== clientToDelete.id))
    setIsDeleteClientModalOpen(false)
    toast({
      title: "Client deleted",
      description: `${clientToDelete.name} has been removed from your clients.`,
    })
  }
  
  const saveNewClient = (newClient) => {
    const clientWithId = {
      ...newClient,
      id: clients.length + 1,
      avatar: "/placeholder.svg?height=80&width=80",
      lastVisit: new Date().toISOString().split('T')[0],
      totalHours: 0,
      todayHours: 0,
      visits: []
    }
    setClients([...clients, clientWithId])
    setIsNewClientModalOpen(false)
    toast({
      title: "Client added",
      description: `${newClient.name} has been added to your clients.`,
    })
  }
  
  const saveEditedClient = (editedClient) => {
    setClients(clients.map(c => c.id === editedClient.id ? editedClient : c))
    setIsEditClientModalOpen(false)
    toast({
      title: "Client updated",
      description: `${editedClient.name}'s information has been updated.`,
    })
  }
  
  // Product functions
  const openProductModal = (product = null) => {
    setProductToEdit(product ? {...product} : {
      id: products.length + 1,
      name: "",
      quantity: 0,
      price: 0,
      description: "",
      lowStock: false
    })
    setIsProductModalOpen(true)
  }
  
  const handleDeleteProduct = (product) => {
    setProductToEdit(product)
    setIsDeleteProductModalOpen(true)
  }
  
  const confirmDeleteProduct = () => {
    setProducts(products.filter(p => p.id !== productToEdit.id))
    setIsDeleteProductModalOpen(false)
    toast({
      title: "Product deleted",
      description: `${productToEdit.name} has been removed from your products.`,
    })
  }
  
  const saveProduct = (product) => {
    if (products.some(p => p.id === product.id)) {
      setProducts(products.map(p => p.id === product.id ? product : p))
      toast({
        title: "Product updated",
        description: `${product.name} has been updated.`,
      })
    } else {
      setProducts([...products, product])
      toast({
        title: "Product added",
        description: `${product.name} has been added to your products.`,
      })
    }
    setIsProductModalOpen(false)
  }
  
  // Invoice functions
  const selectInvoice = (invoice) => {
    setSelectedInvoice(invoice)
  }
  
  const createNewInvoice = () => {
    setNewInvoice({
      id: `INV-00${invoices.length + 1}`,
      clientId: null,
      clientName: "",
      status: "pending",
      total: 0,
      createdAt: new Date().toLocaleString(),
      items: [],
      playTime: { hours: 0, minutes: 0, rate: 8.99 },
      discount: 0,
      notes: ""
    })
    setIsNewInvoiceModalOpen(true)
  }
  
  const editInvoice = (invoice) => {
    if (invoice.status === "completed") {
      toast({
        title: "Cannot edit completed invoice",
        description: "Completed invoices cannot be modified.",
        variant: "destructive"
      })
      return
    }
    
    setInvoiceToEdit({...invoice})
    setIsEditInvoiceModalOpen(true)
  }
  
  const addProductToInvoice = (productId, invoice = null) => {
    const product = products.find(p => p.id === Number.parseInt(productId))
    if (!product) return
    
    const targetInvoice = invoice || newInvoice
    const existingItem = targetInvoice.items.find(item => item.productId === product.id)
    
    if (existingItem) {
      const updatedItems = targetInvoice.items.map(item => 
        item.productId === product.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      )
      
      if (invoice) {
        setInvoiceToEdit({
          ...targetInvoice,
          items: updatedItems,
          total: calculateTotal(updatedItems, targetInvoice.playTime, targetInvoice.discount)
        })
      } else {
        setNewInvoice({
          ...targetInvoice,
          items: updatedItems,
          total: calculateTotal(updatedItems, targetInvoice.playTime, targetInvoice.discount)
        })
      }
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price
      }
      
      if (invoice) {
        setInvoiceToEdit({
          ...targetInvoice,
          items: [...targetInvoice.items, newItem],
          total: calculateTotal([...targetInvoice.items, newItem], targetInvoice.playTime, targetInvoice.discount)
        })
      } else {
        setNewInvoice({
          ...targetInvoice,
          items: [...targetInvoice.items, newItem],
          total: calculateTotal([...targetInvoice.items, newItem], targetInvoice.playTime, targetInvoice.discount)
        })
      }
    }
  }
  
  const updateItemQuantity = (productId, change, invoice = null) => {
    const targetInvoice = invoice || newInvoice
    const updatedItems = targetInvoice.items.map(item => {
      if (item.productId === productId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return {...item, quantity: newQuantity}
      }
      return item
    })
    
    if (invoice) {
      setInvoiceToEdit({
        ...targetInvoice,
        items: updatedItems,
        total: calculateTotal(updatedItems, targetInvoice.playTime, targetInvoice.discount)
      })
    } else {
      setNewInvoice({
        ...targetInvoice,
        items: updatedItems,
        total: calculateTotal(updatedItems, targetInvoice.playTime, targetInvoice.discount)
      })
    }
  }
  
  const removeItemFromInvoice = (productId, invoice = null) => {
    const targetInvoice = invoice || newInvoice
    const updatedItems = targetInvoice.items.filter(item => item.productId !== productId)
    
    if (invoice) {
      setInvoiceToEdit({
        ...targetInvoice,
        items: updatedItems,
        total: calculateTotal(updatedItems, targetInvoice.playTime, targetInvoice.discount)
      })
    } else {
      setNewInvoice({
        ...targetInvoice,
        items: updatedItems,
        total: calculateTotal(updatedItems, targetInvoice.playTime, targetInvoice.discount)
      })
    }
  }
  
  const updatePlayTime = (field, value, invoice = null) => {
    const targetInvoice = invoice || newInvoice
    const updatedPlayTime = {...targetInvoice.playTime, [field]: Number.parseInt(value) || 0}
    
    if (invoice) {
      setInvoiceToEdit({
        ...targetInvoice,
        playTime: updatedPlayTime,
        total: calculateTotal(targetInvoice.items, updatedPlayTime, targetInvoice.discount)
      })
    } else {
      setNewInvoice({
        ...targetInvoice,
        playTime: updatedPlayTime,
        total: calculateTotal(targetInvoice.items, updatedPlayTime, targetInvoice.discount)
      })
    }
  }
  
  const updateDiscount = (value, invoice = null) => {
    const discount = Number.parseFloat(value) || 0
    const targetInvoice = invoice || newInvoice
    
    if (invoice) {
      setInvoiceToEdit({
        ...targetInvoice,
        discount,
        total: calculateTotal(targetInvoice.items, targetInvoice.playTime, discount)
      })
    } else {
      setNewInvoice({
        ...targetInvoice,
        discount,
        total: calculateTotal(targetInvoice.items, targetInvoice.playTime, discount)
      })
    }
  }
  
  const updateNotes = (value, invoice = null) => {
    if (invoice) {
      setInvoiceToEdit({
        ...invoiceToEdit,
        notes: value
      })
    } else {
      setNewInvoice({
        ...newInvoice,
        notes: value
      })
    }
  }
  
  const calculateTotal = (items, playTime, discount = 0) => {
    const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const playTimeTotal = (playTime.hours + (playTime.minutes / 60)) * playTime.rate
    const subtotal = itemsTotal + playTimeTotal
    const discountAmount = (subtotal * discount) / 100
    return Number.parseFloat((subtotal - discountAmount).toFixed(2))
  }
  
  const saveInvoice = () => {
    if (!newInvoice.clientId) {
      toast({
        title: "Error",
        description: "Please select a client for this invoice.",
        variant: "destructive"
      })
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      const finalInvoice = {
        ...newInvoice,
        total: calculateTotal(newInvoice.items, newInvoice.playTime, newInvoice.discount)
      }
      
      setInvoices([...invoices, finalInvoice])
      setSelectedInvoice(finalInvoice)
      setIsNewInvoiceModalOpen(false)
      
      // Update product quantities
      const updatedProducts = products.map(product => {
        const invoiceItem = finalInvoice.items.find(item => item.productId === product.id)
        if (invoiceItem) {
          return {
            ...product,
            quantity: product.quantity - invoiceItem.quantity,
            lowStock: (product.quantity - invoiceItem.quantity) <= 10
          }
        }
        return product
      })
      setProducts(updatedProducts)
      
      toast({
        title: "Invoice created",
        description: `Invoice ${finalInvoice.id} has been created.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  const saveEditedInvoice = () => {
    if (!invoiceToEdit.clientId) {
      toast({
        title: "Error",
        description: "Please select a client for this invoice.",
        variant: "destructive"
      })
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      const updatedInvoice = {
        ...invoiceToEdit,
        total: calculateTotal(invoiceToEdit.items, invoiceToEdit.playTime, invoiceToEdit.discount)
      }
      
      setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv))
      setSelectedInvoice(updatedInvoice)
      setIsEditInvoiceModalOpen(false)
      
      // Update product quantities
      const updatedProducts = [...products]
      
      toast({
        title: "Invoice updated",
        description: `Invoice ${updatedInvoice.id} has been updated.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  const completeInvoice = (invoice) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const updatedInvoices = invoices.map(inv => 
        inv.id === invoice.id ? {...inv, status: "completed"} : inv
      )
      setInvoices(updatedInvoices)
      setSelectedInvoice({...invoice, status: "completed"})
      
      toast({
        title: "Sale completed",
        description: `Invoice ${invoice.id} has been marked as completed.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  const selectClient = (clientId, invoice = null) => {
    const client = clients.find(c => c.id === Number.parseInt(clientId))
    if (client) {
      if (invoice) {
        setInvoiceToEdit({
          ...invoiceToEdit,
          clientId: client.id,
          clientName: client.name
        })
      } else {
        setNewInvoice({
          ...newInvoice,
          clientId: client.id,
          clientName: client.name
        })
      }
    }
  }
  
  // Event functions
  const createNewEvent = () => {
    setNewEvent({
      id: events.length + 1,
      name: "",
      type: "birthday",
      date: "",
      time: "",
      hostClientId: null,
      hostClientName: "",
      capacity: 15,
      confirmed: 0,
      specialRequirements: ""
    })
    setIsNewEventModalOpen(true)
  }
  
  const saveEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      setEvents([...events, newEvent])
      setIsNewEventModalOpen(false)
      
      toast({
        title: "Event created",
        description: `${newEvent.name} has been scheduled for ${newEvent.date}.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  const selectEventHost = (clientId) => {
    const client = clients.find(c => c.id === Number.parseInt(clientId))
    if (client) {
      setNewEvent({
        ...newEvent,
        hostClientId: client.id,
        hostClientName: client.name
      })
    } else {
      setNewEvent({
        ...newEvent,
        hostClientId: null,
        hostClientName: ""
      })
    }
  }
  
  const handleEventDragEnd = (result) => {
    if (!result.destination) return
    
    const items = Array.from(events)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setEvents(items)
    
    toast({
      title: "Event rescheduled",
      description: `${reorderedItem.name} has been rescheduled.`,
    })
  }
  
  // Session functions
  const createNewSession = () => {
    setNewSession({
      clientId: null,
      clientName: "",
      duration: 60,
      timeHours: 1,
      timeMinutes: 0
    })
    setIsNewSessionModalOpen(true)
  }
  
  const selectSessionClient = (clientId) => {
    const client = clients.find(c => c.id === Number.parseInt(clientId))
    if (client) {
      setNewSession({
        ...newSession,
        clientId: client.id,
        clientName: client.name
      })
    }
  }
  
  const updateSessionTime = (field, value) => {
    if (field === "timeHours") {
      setNewSession({
        ...newSession,
        timeHours: Number.parseInt(value) || 0,
        duration: ((Number.parseInt(value) || 0) * 60) + newSession.timeMinutes
      })
    } else if (field === "timeMinutes") {
      setNewSession({
        ...newSession,
        timeMinutes: Number.parseInt(value) || 0,
        duration: (newSession.timeHours * 60) + (Number.parseInt(value) || 0)
      })
    }
  }
  
  const adjustSessionTime = (field, change) => {
    if (field === "hours") {
      const newHours = Math.max(0, newSession.timeHours + change)
      updateSessionTime("timeHours", newHours)
    } else if (field === "minutes") {
      let newMinutes = newSession.timeMinutes + change
      if (newMinutes < 0) {
        newMinutes = 45
        updateSessionTime("timeHours", Math.max(0, newSession.timeHours - 1))
      } else if (newMinutes >= 60) {
        newMinutes = 0
        updateSessionTime("timeHours", newSession.timeHours + 1)
      }
      updateSessionTime("timeMinutes", newMinutes)
    }
  }
  
  const startSession = () => {
    if (!newSession.clientId) {
      toast({
        title: "Error",
        description: "Please select a client for this session.",
        variant: "destructive"
      })
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      const client = clients.find(c => c.id === newSession.clientId)
      
      const newActiveSession = {
        id: activeSessions.length + 1,
        clientId: newSession.clientId,
        clientName: newSession.clientName,
        avatar: client.avatar,
        startTime: new Date().toISOString(),
        duration: newSession.duration,
        emergency: client.emergencyContact,
        status: "active"
      }
      
      setActiveSessions([...activeSessions, newActiveSession])
      setIsNewSessionModalOpen(false)
      
      // Update client's today hours
      const updatedClients = clients.map(c => {
        if (c.id === newSession.clientId) {
          return {
            ...c,
            todayHours: c.todayHours + (newSession.duration / 60)
          }
        }
        return c
      })
      setClients(updatedClients)
      
      toast({
        title: "Session started",
        description: `${newSession.clientName}'s session has started.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  const openEndSessionModal = (session) => {
    setSessionToEnd(session)
    setIsEndSessionModalOpen(true)
  }
  
  const endSession = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      // Remove session from active sessions
      setActiveSessions(activeSessions.filter(s => s.id !== sessionToEnd.id))
      
      // Create invoice from session
      const client = clients.find(c => c.id === sessionToEnd.clientId)
      const startTime = new Date(sessionToEnd.startTime)
      const now = new Date()
      const elapsedMinutes = Math.floor((now - startTime) / 60000)
      
      const hours = Math.floor(elapsedMinutes / 60)
      const minutes = elapsedMinutes % 60
      
      const newInvoiceFromSession = {
        id: `INV-00${invoices.length + 1}`,
        clientId: sessionToEnd.clientId,
        clientName: sessionToEnd.clientName,
        status: "pending",
        createdAt: new Date().toLocaleString(),
        items: [],
        playTime: { hours, minutes, rate: 8.99 },
        discount: 0,
        notes: `Auto-generated from session (${hours}h ${minutes}m)`
      }
      
      newInvoiceFromSession.total = calculateTotal(
        newInvoiceFromSession.items, 
        newInvoiceFromSession.playTime,
        newInvoiceFromSession.discount
      )
      
      setInvoices([...invoices, newInvoiceFromSession])
      setIsEndSessionModalOpen(false)
      
      toast({
        title: "Session ended",
        description: `${sessionToEnd.clientName}'s session has ended and an invoice has been created.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  const toggleSessionSelection = (sessionId) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter(id => id !== sessionId))
    } else {
      setSelectedSessions([...selectedSessions, sessionId])
    }
  }
  
  const bulkEndSessions = () => {
    if (selectedSessions.length === 0) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      // Remove sessions from active sessions
      const sessionsToEnd = activeSessions.filter(s => selectedSessions.includes(s.id))
      setActiveSessions(activeSessions.filter(s => !selectedSessions.includes(s.id)))
      
      // Create invoices from sessions
      const newInvoicesFromSessions = sessionsToEnd.map(session => {
        const startTime = new Date(session.startTime)
        const now = new Date()
        const elapsedMinutes = Math.floor((now - startTime) / 60000)
        
        const hours = Math.floor(elapsedMinutes / 60)
        const minutes = elapsedMinutes % 60
        
        return {
          id: `INV-00${invoices.length + sessionsToEnd.indexOf(session) + 1}`,
          clientId: session.clientId,
          clientName: session.clientName,
          status: "pending",
          createdAt: new Date().toLocaleString(),
          items: [],
          playTime: { hours, minutes, rate: 8.99 },
          discount: 0,
          notes: `Auto-generated from bulk session end (${hours}h ${minutes}m)`,
          total: ((hours + (minutes / 60)) * 8.99).toFixed(2)
        }
      })
      
      setInvoices([...invoices, ...newInvoicesFromSessions])
      setSelectedSessions([])
      
      toast({
        title: "Sessions ended",
        description: `${sessionsToEnd.length} sessions have been ended and invoices created.`,
      })
      
      setIsLoading(false)
    }, 1000)
  }
  
  // Export functions
  const openExportModal = () => {
    setExportFormat("csv")
    setIsExportModalOpen(true)
  }
  
  const exportSessionHistory = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Session history has been exported as ${exportFormat.toUpperCase()}.`,
      })
      
      setIsExportModalOpen(false)
      setIsLoading(false)
    }, 1500)
  }
  
  // Format time remaining for sessions
  const formatTimeRemaining = (session) => {
    const startTime = new Date(session.startTime)
    const now = new Date()
    const elapsedMinutes = Math.floor((now - startTime) / 60000)
    const remainingMinutes = session.duration - elapsedMinutes
    
    if (remainingMinutes <= 0) {
      return "Expired"
    }
    
    const hours = Math.floor(remainingMinutes / 60)
    const minutes = remainingMinutes % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`
    }
    
    return `${minutes}m remaining`
  }
  
  // Format date for event countdown
  const formatEventCountdown = (date, time) => {
    const eventDate = new Date(`${date}T${time}`)
    const now = new Date()
    const diffTime = eventDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return "Past event"
    } else if (diffDays === 0) {
      return "Today!"
    } else if (diffDays === 1) {
      return "Tomorrow"
    } else {
      return `${diffDays} days`
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full border-r bg-slate-50 md:w-64">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-semibold text-pink-600">Playground Manager</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex w-full items-center rounded-md px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 ${activeTab === "dashboard" ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : ""}`}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("clients")}
                className={`flex w-full items-center rounded-md px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 ${activeTab === "clients" ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : ""}`}
              >
                <Users className="mr-2 h-5 w-5" />
                Clients
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("sales")}
                className={`flex w-full items-center rounded-md px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 ${activeTab === "sales" ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : ""}`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Sales
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex w-full items-center rounded-md px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 ${activeTab === "products" ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : ""}`}
              >
                <Package className="mr-2 h-5 w-5" />
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("events")}
                className={`flex w-full items-center rounded-md px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 ${activeTab === "events" ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : ""}`}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Events
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex h-16 items-center justify-end border-b px-6">
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={openExportModal}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export Session History</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span className="hidden md:inline-block">John Doe</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex-1 p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
                  <div className="flex gap-2">
                    <Button 
                      onClick={createNewSession}
                      className="bg-[#6B46C1] hover:bg-purple-800"
                    >
                      <Play className="mr-2 h-4 w-4" /> Start Session
                    </Button>
                    {selectedSessions.length > 0 && (
                      <Button 
                        onClick={bulkEndSessions}
                        variant="outline"
                        className="border-[#6B46C1] text-[#6B46C1]"
                      >
                        <Square className="mr-2 h-4 w-4" /> End Selected ({selectedSessions.length})
                      </Button>
                    )}
                  </div>
                </div>
                
                <h3 className="mb-4 text-lg font-semibold text-slate-700">Active Sessions</h3>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {activeSessions.map((session) => (
                    <Card
                      key={session.id}
                      className={`relative overflow-hidden ${
                        session.status === "active" 
                          ? "border-green-300" 
                          : session.status === "ending-soon" 
                            ? "border-yellow-300" 
                            : "border-red-300"
                      }`}
                    >
                      <div className="absolute left-0 top-0 flex h-full w-1.5 items-center">
                        <div 
                          className={`h-full w-full ${
                            session.status === "active" 
                              ? "bg-green-500" 
                              : session.status === "ending-soon" 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          } ${
                            session.status === "active" ? "animate-pulse" : ""
                          }`}
                        />
                      </div>
                      
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300"
                            checked={selectedSessions.includes(session.id)}
                            onChange={() => toggleSessionSelection(session.id)}
                          />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={session.avatar} alt={session.clientName} />
                            <AvatarFallback className="bg-pink-200 text-pink-700">
                              {session.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{session.clientName}</h4>
                            <p className="text-xs text-slate-500">
                              Started: {new Date(session.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={`${
                            session.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : session.status === "ending-soon" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {session.status === "active" 
                            ? "Active" 
                            : session.status === "ending-soon" 
                              ? "Ending Soon" 
                              : "Expired"}
                        </Badge>
                      </CardHeader>
                      
                      <CardContent className="pb-2 pt-0">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-[#6B46C1]">
                            {formatTimeRemaining(session)}
                          </span>
                          <span className="text-xs text-slate-500">
                            {session.duration} min total
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          <span className="font-medium">Emergency:</span> {session.emergency}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-end pt-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-[#6B46C1]"
                                onClick={() => openEndSessionModal(session)}
                              >
                                <Square className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>End Session</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <h3 className="mb-4 text-lg font-semibold text-slate-700">Product Inventory Status</h3>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <Card key={product.id} className={product.lowStock ? "border-red-300" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{product.name}</h4>
                          {product.lowStock && (
                            <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-slate-500">Quantity: {product.quantity}</span>
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h3 className="mb-4 text-lg font-semibold text-slate-700">Recent Invoices</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.slice(0, 5).map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.clientName}</TableCell>
                          <TableCell>{invoice.createdAt}</TableCell>
                          <TableCell>
                            <Badge className={invoice.status === "pending" 
                              ? "bg-red-100 text-red-800" 
                              : "bg-[#4ECDC4] text-emerald-800"
                            }>
                              {invoice.status === "pending" ? "Pending" : "Completed"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${invoice.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            
            {/* Clients Tab */}
            {activeTab === "clients" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Clients</h2>
                  <Button 
                    onClick={() => setIsNewClientModalOpen(true)}
                    className="bg-[#FF6B6B] hover:bg-[#FF5252]"
                  >
                    <Plus className="mr-2 h-4 w-4" /> New Client
                  </Button>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {clients.map((client) => (
                    <Card
                      key={client.id}
                      className="group relative overflow-hidden transition-all hover:shadow-lg"
                      onClick={(e) => openClientDetails(client, e)}
                    >
                      <button 
                        className="absolute right-2 top-2 rounded-full bg-white p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                        onClick={(e) => handleEditClient(client, e)}
                      >
                        <Edit className="h-4 w-4 text-[#FF6B6B]" />
                      </button>
                      
                      <CardHeader className="flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100 p-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback className="bg-pink-200 text-pink-700">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="mb-2 text-xl font-semibold text-slate-800">{client.name}</h3>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p>
                            <span className="font-medium">Age:</span> {client.age} ({client.birthdate})
                          </p>
                          <p>
                            <span className="font-medium">Parents:</span> {client.parents}
                          </p>
                          <p>
                            <span className="font-medium">Address:</span> {client.address.substring(0, 20)}
                            {client.address.length > 20 ? "..." : ""}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> {client.phone}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-[#6B46C1]">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Today: {client.todayHours}hrs</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between bg-slate-50 p-3 text-xs text-slate-500">
                        <span>Last visit: {client.lastVisit}</span>
                        <button 
                          className="rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => handleDeleteClient(client, e)}
                        >
                          <Trash className="h-4 w-4 text-[#FF6B6B]" />
                        </button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Products</h2>
                  <Button 
                    onClick={() => openProductModal()}
                    className="bg-[#FF6B6B] hover:bg-[#FF5252]"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id} className={product.lowStock ? "bg-red-50" : ""}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="hidden max-w-[200px] truncate md:table-cell">{product.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {product.quantity}
                              {product.lowStock && (
                                <Badge className="bg-red-100 text-red-800">Low</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openProductModal(product)}
                              >
                                <Edit className="h-4 w-4 text-slate-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteProduct(product)}
                              >
                                <Trash className="h-4 w-4 text-[#FF6B6B]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            
            {/* Sales Tab */}
            {activeTab === "sales" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Sales</h2>
                  <Button 
                    onClick={createNewInvoice}
                    className="bg-[#FF6B6B] hover:bg-[#FF5252]"
                  >
                    <Plus className="mr-2 h-4 w-4" /> New Invoice
                  </Button>
                </div>
                
                <div className="grid gap-6 md:grid-cols-[30%_70%]">
                  {/* Invoices List */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-700">Active Invoices</h3>
                    {invoices.map((invoice) => (
                      <Card 
                        key={invoice.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedInvoice?.id === invoice.id ? 'ring-2 ring-pink-400' : ''}`}
                        onClick={() => selectInvoice(invoice)}
                      >
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-medium">{invoice.id}</span>
                            <div className="flex items-center gap-2">
                              <Badge className={invoice.status === "pending" 
                                ? "bg-red-100 text-red-800 hover:bg-red-200" 
                                : "bg-[#4ECDC4] text-emerald-800 hover:bg-emerald-200"
                              }>
                                {invoice.status === "pending" ? "Pending" : "Completed"}
                              </Badge>
                              {invoice.status === "pending" && (
                                <button 
                                  className="rounded-full p-1 text-slate-500 hover:bg-slate-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    editInvoice(invoice);
                                  }}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="mb-1 text-sm text-slate-600">{invoice.clientName}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">{invoice.createdAt}</span>
                            <span className="font-semibold">${invoice.total.toFixed(2)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Invoice Details */}
                  {selectedInvoice && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <div>
                          <CardTitle className="text-xl">Invoice {selectedInvoice.id}</CardTitle>
                          <CardDescription>
                            Client: {selectedInvoice.clientName}
                          </CardDescription>
                        </div>
                        <Badge className={selectedInvoice.status === "pending" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-[#4ECDC4] text-emerald-800"
                        }>
                          {selectedInvoice.status === "pending" ? "Pending" : "Completed"}
                        </Badge>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <h4 className="mb-2 font-medium">Items</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-right">Qty</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedInvoice.items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                  <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                              {selectedInvoice.playTime.hours > 0 || selectedInvoice.playTime.minutes > 0 ? (
                                <TableRow>
                                  <TableCell>
                                    Playtime ({selectedInvoice.playTime.hours}h {selectedInvoice.playTime.minutes}m)
                                  </TableCell>
                                  <TableCell className="text-right">1</TableCell>
                                  <TableCell className="text-right">
                                    ${((selectedInvoice.playTime.hours + (selectedInvoice.playTime.minutes / 60)) * selectedInvoice.playTime.rate).toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    ${((selectedInvoice.playTime.hours + (selectedInvoice.playTime.minutes / 60)) * selectedInvoice.playTime.rate).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </TableBody>
                          </Table>
                        </div>
                        
                        {selectedInvoice.notes && (
                          <div className="mb-4 rounded-md bg-slate-50 p-3 text-sm">
                            <p className="font-medium">Notes:</p>
                            <p className="text-slate-600">{selectedInvoice.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-col items-end space-y-2">
                          {selectedInvoice.discount > 0 && (
                            <div className="flex w-[200px] justify-between">
                              <span className="text-sm">Discount ({selectedInvoice.discount}%):</span>
                              <span className="text-sm text-red-600">
                                -${((selectedInvoice.total / (1 - selectedInvoice.discount / 100)) * (selectedInvoice.discount / 100)).toFixed(2)}
                              </span>
                            </div>
                          )}
                          <div className="flex w-[200px] justify-between border-t pt-2">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">${selectedInvoice.total.toFixed(2)}</span>
                          </div>
                          
                          {selectedInvoice.status === "pending" && (
                            <Button 
                              onClick={() => completeInvoice(selectedInvoice)}
                              className="mt-4 bg-[#4ECDC4] hover:bg-emerald-500"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                  Processing...
                                </>
                              ) : (
                                <>Complete Sale</>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
            
            {/* Events Tab */}
            {activeTab === "events" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Events</h2>
                  <Button 
                    onClick={createNewEvent}
                    className="bg-[#FF6B6B] hover:bg-[#FF5252]"
                  >
                    <Plus className="mr-2 h-4 w-4" /> New Event
                  </Button>
                </div>
                
                <DragDropContext onDragEnd={handleEventDragEnd}>
                  <Droppable droppableId="events">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {events.map((event, index) => (
                          <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card className="relative overflow-hidden">
                                  <div 
                                    className={`absolute right-0 top-0 h-full w-1.5 ${
                                      event.type === "birthday" ? "bg-pink-500" : "bg-blue-500"
                                    }`}
                                  />
                                  <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                      <Badge className={event.type === "birthday" 
                                        ? "bg-pink-100 text-pink-800" 
                                        : "bg-blue-100 text-blue-800"
                                      }>
                                        {event.type === "birthday" ? "Birthday" : "Private"}
                                      </Badge>
                                      <div className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800">
                                        {formatEventCountdown(event.date, event.time)}
                                      </div>
                                    </div>
                                    <h3 className="text-lg font-semibold">{event.name}</h3>
                                    <p className="text-sm text-slate-500">
                                      {event.date} at {event.time}
                                    </p>
                                  </CardHeader>
                                  <CardContent className="pb-2 pt-0">
                                    {event.hostClientId && (
                                      <div className="mb-2 flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                                            {event.hostClientName
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{event.hostClientName}</span>
                                      </div>
                                    )}
                                    <div className="mb-1 text-xs text-slate-500">
                                      Capacity: {event.confirmed}/{event.capacity} confirmed
                                    </div>
                                    <Progress 
                                      value={(event.confirmed / event.capacity) * 100} 
                                      className="h-2"
                                    />
                                    {event.specialRequirements && (
                                      <div className="mt-2 text-xs text-slate-500">
                                        <span className="font-medium">Special requirements:</span> {event.specialRequirements}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
          
          {/* Right Sidebar - Events */}
          {activeTab !== "events" && (
            <div className="hidden w-80 border-l bg-slate-50 p-4 lg:block">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-700">Upcoming Events</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={createNewEvent}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4 space-y-3">
                {events.map((event) => (
                  <Card key={event.id} className="relative overflow-hidden">
                    <div 
                      className={`absolute right-0 top-0 h-full w-1 ${
                        event.type === "birthday" ? "bg-pink-500" : "bg-blue-500"
                      }`}
                    />
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <Badge className={event.type === "birthday" 
                          ? "bg-pink-100 text-pink-800" 
                          : "bg-blue-100 text-blue-800"
                        }>
                          {event.type === "birthday" ? "Birthday" : "Private"}
                        </Badge>
                        <div className="text-xs font-medium text-slate-800">
                          {formatEventCountdown(event.date, event.time)}
                        </div>
                      </div>
                      <h4 className="mt-1 font-medium">{event.name}</h4>
                      <p className="text-xs text-slate-500">
                        {event.date} at {event.time}
                      </p>
                      {event.hostClientId && (
                        <div className="mt-2 flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="bg-slate-200 text-slate-700 text-[8px]">
                              {event.hostClientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{event.hostClientName}</span>
                        </div>
                      )}
                      <div className="mt-1">
                        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                          <span>{event.confirmed}/{event.capacity}</span>
                          <span>{Math.round((event.confirmed / event.capacity) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(event.confirmed / event.capacity) * 100} 
                          className="h-1.5"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Client Details Modal */}
      {selectedClient && (
        <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800">{selectedClient.name}</DialogTitle>
              <DialogDescription>Client details and visit history</DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid gap-6 md:grid-cols-[200px_1fr]">
              <div className="flex flex-col items-center">
                <Avatar className="h-40 w-40">
                  <AvatarImage src={selectedClient.avatar} alt={selectedClient.name} />
                  <AvatarFallback className="bg-pink-200 text-pink-700 text-2xl">
                    {selectedClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 grid w-full grid-cols-2 gap-2">
                  <div className="rounded-md bg-[#6B46C1] p-3 text-center">
                    <p className="text-sm font-medium text-purple-100">Today</p>
                    <p className="text-xl font-bold text-white">{selectedClient.todayHours}h</p>
                  </div>
                  <div className="rounded-md bg-purple-100 p-3 text-center">
                    <p className="text-sm font-medium text-purple-800">Total</p>
                    <p className="text-xl font-bold text-purple-900">{selectedClient.totalHours}h</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-md bg-slate-50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-700">Personal Information</h3>
                  <div className="grid gap-2 text-sm">
                    <p>
                      <span className="font-medium">Age:</span> {selectedClient.age} years
                    </p>
                    <p>
                      <span className="font-medium">Birthdate:</span> {selectedClient.birthdate}
                    </p>
                    <p>
                      <span className="font-medium">Parents:</span> {selectedClient.parents}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span> {selectedClient.address}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {selectedClient.phone}
                    </p>
                    <p>
                      <span className="font-medium">Emergency Contact:</span> {selectedClient.emergencyContact}
                    </p>
                    <p>
                      <span className="font-medium">Last Visit:</span> {selectedClient.lastVisit}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-700">Recent Visits</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedClient.visits.map((visit, index) => (
                        <TableRow key={index}>
                          <TableCell>{visit.date}</TableCell>
                          <TableCell>{visit.duration}</TableCell>
                          <TableCell>{visit.activity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* New Client Modal */}
      <Dialog open={isNewClientModalOpen} onOpenChange={setIsNewClientModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the client's information below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const newClient = {
              name: formData.get("name"),
              age: Number.parseInt(formData.get("age")),
              birthdate: formData.get("birthdate"),
              parents: formData.get("parents"),
              address: formData.get("address"),
              phone: formData.get("phone"),
              emergencyContact: formData.get("emergency"),
            }
            saveNewClient(newClient)
          }}>
            <div className="grid gap-4 py-4">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-pink-200 text-pink-700">
                      <Plus className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full bg-[#FF6B6B] p-1 hover:bg-[#FF5252]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Child's Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" type="number" min="0" required />
                </div>
                <div>
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input id="birthdate" name="birthdate" type="date" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="parents">Parents' Names</Label>
                  <Input id="parents" name="parents" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input id="emergency" name="emergency" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewClientModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#4ECDC4] hover:bg-emerald-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Saving...
                  </>
                ) : (
                  <>Save Client</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Client Modal */}
      {clientToEdit && (
        <Dialog open={isEditClientModalOpen} onOpenChange={setIsEditClientModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
              <DialogDescription>
                Update the client's information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const editedClient = {
                ...clientToEdit,
                name: formData.get("name"),
                age: Number.parseInt(formData.get("age")),
                birthdate: formData.get("birthdate"),
                parents: formData.get("parents"),
                address: formData.get("address"),
                phone: formData.get("phone"),
                emergencyContact: formData.get("emergency"),
              }
              saveEditedClient(editedClient)
            }}>
              <div className="grid gap-4 py-4">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={clientToEdit.avatar} alt={clientToEdit.name} />
                      <AvatarFallback className="bg-pink-200 text-pink-700">
                        {clientToEdit.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full bg-[#FF6B6B] p-1 hover:bg-[#FF5252]"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="edit-name">Child's Name</Label>
                    <Input id="edit-name" name="name" defaultValue={clientToEdit.name} required />
                  </div>
                  <div>
                    <Label htmlFor="edit-age">Age</Label>
                    <Input id="edit-age" name="age" type="number" min="0" defaultValue={clientToEdit.age} required />
                  </div>
                  <div>
                    <Label htmlFor="edit-birthdate">Birthdate</Label>
                    <Input id="edit-birthdate" name="birthdate" type="date" defaultValue={clientToEdit.birthdate} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-parents">Parents' Names</Label>
                    <Input id="edit-parents" name="parents" defaultValue={clientToEdit.parents} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input id="edit-phone" name="phone" defaultValue={clientToEdit.phone} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-emergency">Emergency Contact</Label>
                    <Input id="edit-emergency" name="emergency" defaultValue={clientToEdit.emergencyContact} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-address">Address</Label>
                    <Textarea id="edit-address" name="address" defaultValue={clientToEdit.address} required />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditClientModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#4ECDC4] hover:bg-emerald-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Updating...
                    </>
                  ) : (
                    <>Update Client</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Client Confirmation Modal */}
      {clientToDelete && (
        <Dialog open={isDeleteClientModalOpen} onOpenChange={setIsDeleteClientModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {clientToDelete.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteClientModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteClient}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Deleting...
                  </>
                ) : (
                  <>Delete</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Product Modal */}
      {productToEdit && (
        <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{productToEdit.id ? "Edit Product" : "Add Product"}</DialogTitle>
              <DialogDescription>
                {productToEdit.id ? "Update the product details." : "Enter the product details below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const product = {
                ...productToEdit,
                name: formData.get("name"),
                quantity: Number.parseInt(formData.get("quantity")),
                price: Number.parseFloat(formData.get("price")),
                description: formData.get("description"),
                lowStock: Number.parseInt(formData.get("quantity")) <= 10
              }
              saveProduct(product)
            }}>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="product-name">Name</Label>
                  <Input id="product-name" name="name" defaultValue={productToEdit.name} required />
                </div>
                <div>
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea id="product-description" name="description" defaultValue={productToEdit.description || ""} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product-quantity">Quantity</Label>
                    <Input 
                      id="product-quantity" 
                      name="quantity" 
                      type="number" 
                      min="0" 
                      defaultValue={productToEdit.quantity} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-price">Price ($)</Label>
                    <Input 
                      id="product-price" 
                      name="price" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      defaultValue={productToEdit.price} 
                      required 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsProductModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#4ECDC4] hover:bg-emerald-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Saving...
                    </>
                  ) : (
                    productToEdit.id ? "Update Product" : "Add Product"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Product Confirmation Modal */}
      {productToEdit && (
        <Dialog open={isDeleteProductModalOpen} onOpenChange={setIsDeleteProductModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {productToEdit.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteProductModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteProduct}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Deleting...
                  </>
                ) : (
                  <>Delete</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* New Invoice Modal */}
      <Dialog open={isNewInvoiceModalOpen} onOpenChange={setIsNewInvoiceModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Add products and services to this invoice.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="client-select">Select Client</Label>
              <Select onValueChange={selectClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-select">Add Product</Label>
                <Select onValueChange={addProductToInvoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="playtime-hours" className="text-[#6B46C1]">Playtime</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#6B46C1] text-[#6B46C1]"
                        onClick={() => adjustSessionTime("hours", -1)}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="playtime-hours" 
                        type="number" 
                        min="0" 
                        className="w-16 text-center"
                        value={newInvoice.playTime.hours}
                        onChange={(e) => updatePlayTime('hours', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#6B46C1] text-[#6B46C1]"
                        onClick={() => adjustSessionTime("hours", 1)}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <span>h</span>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#6B46C1] text-[#6B46C1]"
                        onClick={() => {
                          const newMinutes = Math.max(0, newInvoice.playTime.minutes - 15);
                          updatePlayTime('minutes', newMinutes);
                        }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Input 
                        type="number" 
                        min="0" 
                        max="59" 
                        className="w-16 text-center"
                        value={newInvoice.playTime.minutes}
                        onChange={(e) => updatePlayTime('minutes', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#6B46C1] text-[#6B46C1]"
                        onClick={() => {
                          const newMinutes = Math.min(45, newInvoice.playTime.minutes + 15);
                          updatePlayTime('minutes', newMinutes);
                        }}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <span>m</span>
                  </div>
                </div>
                <Button
                  type="button"
                  className="h-10 w-10 rounded-full bg-[#6B46C1] p-0 hover:bg-purple-800"
                  onClick={() => {
                    toast({
                      title: "Time Added",
                      description: `${newInvoice.playTime.hours}h ${newInvoice.playTime.minutes}m added to invoice.`,
                    })
                  }}
                >
                  <Check className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {newInvoice.clientId && (
              <div className="rounded-md bg-[#6B46C1]/10 p-3">
                <div className="flex items-center gap-2 text-sm text-[#6B46C1]">
                  <Clock className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span>Current Session: {newInvoice.playTime.hours}h {newInvoice.playTime.minutes}m</span>
                    <span>Total Today: {clients.find(c => c.id === newInvoice.clientId)?.todayHours || 0}hrs</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input 
                  id="discount" 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={newInvoice.discount}
                  onChange={(e) => updateDiscount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                <Input 
                  id="hourly-rate" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={newInvoice.playTime.rate}
                  onChange={(e) => {
                    const rate = Number.parseFloat(e.target.value) || 0;
                    const updatedPlayTime = {...newInvoice.playTime, rate};
                    setNewInvoice({
                      ...newInvoice,
                      playTime: updatedPlayTime,
                      total: calculateTotal(newInvoice.items, updatedPlayTime, newInvoice.discount)
                    });
                  }}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={newInvoice.notes}
                onChange={(e) => updateNotes(e.target.value)}
              />
            </div>
            
            {newInvoice.items.length > 0 && (
              <div>
                <h4 className="mb-2 font-medium">Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newInvoice.items.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateItemQuantity(item.productId, -1)}\

