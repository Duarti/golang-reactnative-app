package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	OwnerEmail  string `gorm:"size:100" json:"ownerEmail"`
	Owner       User   `gorm:"foreignKey:OwnerEmail;references:Email;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
}
